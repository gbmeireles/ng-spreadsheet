import {
    Component,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    HostListener,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { AfterContentInit, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, NgFor } from '@angular/common';
import { HeaderComponent } from './HeaderComponent';
import { BodyComponent } from './BodyComponent';
import { RowComponent } from './RowComponent';
import { CellComponent, CELL_PROVIDERS } from './Cell/Cell';
import { COLUMN_CELL_PROVIDERS } from './ColumnCell/ColumnCell';
import { DetailsBarComponent } from './DetailsBarComponent';
import { StatusBarComponent } from './StatusBarComponent';
import { COLUMN_RESIZE_PROVIDERS } from './ColumnResize/ColumnResize';
import {
    GRID_SCOPE_SERVICES,
    GridDataManager,
    ColumnListGetter,
    ColumnPositionInformationMapUpdater,
    SectionPositionInformationMapUpdater,
    GridSectionListGetter,
    ColumnListManager,
    ColumnViewportUpdater,
    GridSectionListManager,
    RowViewportUpdater,
    RowHeightManager,
    CellListMapManager,
    SectionPositionInformationMapManager,
    ColumnPositionInformationMapManager,
    GridColumnListGetter,
    BodySectionScrollWidthManager,
    BodySectionScrollManager,
    BodyScrollManager,
    GridComponentManager,
} from '../Services/Services';
import {
    ColumnPositionInformationMap,
    Column,
    ContentTypeEnum,
    GridSection,
    GridCell,
    GridData,
    GridRow,
} from '../Model/Model';
import { GridEvent } from './Model/GridEvent';

const html = `
<GgDetailsBar></GgDetailsBar>
<GgHeader [rowCount]="headerRowCount" [numberTitleRowList]="numberTitleRowList" [gridSectionList]="gridSectionList"></GgHeader>
<GgBody [numberDataRowList]="numberDataRowList" [gridSectionList]="gridSectionList"></GgBody>
<GgStatusBar [message]="statusMessage" [timeout]="statusMessageTimeout"></GgStatusBar>`;

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    directives: [
        DetailsBarComponent,
        HeaderComponent,
        BodyComponent,
        StatusBarComponent,
    ],
    providers: [
        GRID_SCOPE_SERVICES,
        COLUMN_RESIZE_PROVIDERS,
        COLUMN_CELL_PROVIDERS,
        CELL_PROVIDERS,
    ],
    selector: 'NgSpreadsheet',
    template: html,
})
export class SpreadsheetComponent implements OnInit, OnDestroy {
    @Input('id') id: string;
    @Output() onGridEvent: EventEmitter<GridEvent<any>> = new EventEmitter<GridEvent<any>>(false);
    @ViewChild(BodyComponent) body: BodyComponent;
    statusMessage: string;
    statusMessageTimeout: number;
    gridSectionList: any[] = [];
    numberDataRowList: GridRow[] = [];
    numberTitleRowList: GridRow[] = [];
    columnList: Column[] = [];
    headerRowCount: number = 0;
    rowHeight: number = 20;
    unsubscribeBodyScrollChanges: () => void;
    unsubscribeGridSectionListChanges: () => void;
    unsubscribeColumnPositionInformationChanges: () => void;

    constructor(private el: ElementRef,
        private columnListGetter: ColumnListGetter,
        private columnPositionInformationMapUpdater: ColumnPositionInformationMapUpdater,
        private sectionPositionInformationMapUpdater: SectionPositionInformationMapUpdater,
        private gridDataManager: GridDataManager,
        private gridSectionListGetter: GridSectionListGetter,
        private columnListManager: ColumnListManager,
        private columnViewportUpdater: ColumnViewportUpdater,
        private rowViewportUpdater: RowViewportUpdater,
        private gridSectionListManager: GridSectionListManager,
        private rowHeightManager: RowHeightManager,
        private cellListMapManager: CellListMapManager,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager,
        private gridColumnListGetter: GridColumnListGetter,
        private bodySectionScrollWidthManager: BodySectionScrollWidthManager,
        private cdr: ChangeDetectorRef,
        private bodyScrollManager: BodyScrollManager,
        private bodySectionScrollManager: BodySectionScrollManager,
        private gridComponentManager: GridComponentManager) {

        this.gridComponentManager.set(<any>this);
        this.updateGridColumnMap(this.columnListManager.get());
        this.columnListManager.subscribe((columnList) => {
            this.updateGridColumnMap(columnList);
        });

        var storedScrollTop = 0;

        this.columnPositionInformationMapUpdater.init();
        this.sectionPositionInformationMapUpdater.init();
        this.columnViewportUpdater.init();
        this.unsubscribeBodyScrollChanges = this.bodyScrollManager.subscribe((scrollTop: number) => {
            storedScrollTop = scrollTop;
            this.rowViewportUpdater.update(scrollTop);
            this.updateGridSectionList(this.gridSectionListManager.get());
        });
        this.unsubscribeGridSectionListChanges = this.gridSectionListManager.subscribe((gridSectionList) => {
            this.updateGridSectionList(gridSectionList);
        });
        this.unsubscribeColumnPositionInformationChanges =
            this.columnPositionInformationMapManager.subscribe((cpim: ColumnPositionInformationMap) => {
                this.updateBodySectionScrollWidth(cpim);
                if (this.gridSectionList.length > 0) {
                    this.gridSectionList.forEach(gc => this.columnViewportUpdater.update({
                        gridSectionName: gc.name,
                        scrollLeft: this.bodySectionScrollManager.get(gc.name),
                    }));
                }
            });

        this.gridDataManager.subscribe(() => {
            this.recalculateGridData();
        });
    }

    @HostListener('focusin', ['$event'])
    onFocus(evt: FocusEvent) {
        evt.preventDefault();
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.unsubscribeBodyScrollChanges();
        this.unsubscribeGridSectionListChanges();
        this.unsubscribeColumnPositionInformationChanges();
    }

    gridSectionIdentity(index: number, gridSection: GridSection): any {
        if (gridSection) {
            return gridSection.name;
        }
        return 'gridSection_' + index;
    }

    update(gridData: GridData) {
        this.gridDataManager.set(gridData);
        this.recalculateGridData();
    }

    updateStatusMessage(message: string, timeout?: number) {
        this.statusMessage = message;
        this.statusMessageTimeout = timeout;
    }

    private recalculateGridData() {
        var gridData = this.gridDataManager.get();
        this.body.updateScrollTop();
        this.rowHeight = gridData.rowHeight || this.rowHeight;
        this.rowHeightManager.set(this.rowHeight);

        this.columnList = this.columnListGetter.get(gridData);
        this.updateGridColumnMap(this.columnList);

        var gridSectionList = this.gridSectionListGetter.get(gridData, this.columnList);
        this.gridSectionListManager.set(gridSectionList);

        this.headerRowCount = gridSectionList[0].titleRowList.length;
        this.columnListManager.set(this.columnList);

        this.updateBodySectionScrollWidth(this.columnPositionInformationMapManager.get());

        this.cdr.markForCheck();
    }

    private updateGridColumnMap(columnList: Column[]) {
        var gridColumnMap = {};
        this.gridColumnListGetter.get(columnList).forEach(gc => gridColumnMap[gc.index] = gc);
        this.cellListMapManager.updateGridColumnMap(gridColumnMap);
    }

    private updateGridSectionList(gridSectionList: GridSection[]) {
        this.gridSectionList = gridSectionList.map((gridSection) => {
            var index = 0;
            this.numberTitleRowList = new Array(gridSection.titleRowList.length);
            while (index < gridSection.titleRowList.length) {
                let visibleRow = gridSection.titleRowList[index];
                let numberTitleRow = {
                    cellList: [],
                    height: this.rowHeight,
                    rowData: null,
                    rowIndex: visibleRow.rowIndex,
                    rowNumber: visibleRow.rowIndex + 1,
                    rowStyle: '',
                    rowType: ContentTypeEnum.Title,
                    sectionRowIndex: visibleRow.sectionRowIndex,
                };
                this.numberTitleRowList[index] = numberTitleRow;
                index++;
            }

            index = 0;
            this.numberDataRowList = new Array(gridSection.visibleDataRowList.length);
            while (index < gridSection.visibleDataRowList.length) {
                let visibleRow = gridSection.visibleDataRowList[index];
                let numberDataRow = {
                    cellList: [],
                    height: this.rowHeight,
                    rowData: null,
                    rowIndex: visibleRow.rowIndex,
                    rowNumber: visibleRow.rowIndex + 1,
                    rowStyle: '',
                    rowType: ContentTypeEnum.Data,
                    sectionRowIndex: visibleRow.sectionRowIndex,
                };
                this.numberDataRowList[index] = numberDataRow;
                index++;
            }

            gridSection['dataRowListLength'] = gridSection.dataRowList.length;

            return gridSection;
        });
        this.cdr.detectChanges();
    }

    private updateBodySectionScrollWidth(cpim: ColumnPositionInformationMap) {
        var gridSectionList = this.gridSectionListManager.get();
        gridSectionList.forEach(gridSection => {
            var scrollWidth = 0;
            this.gridColumnListGetter.get(gridSection.columnList).forEach(gc => scrollWidth += cpim[gc.index].width);

            this.bodySectionScrollWidthManager.set(gridSection.name, scrollWidth);
        });
    }
}