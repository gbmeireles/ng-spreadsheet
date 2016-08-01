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
    Inject,
    ApplicationRef,
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
    ColumnPositionInformationMapCalculator,
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
import {
    EVENT_EMITTER_TOKEN,
    EVENT_PROVIDERS,
    Event,
    ColumnMovedEvent,
    ColumnResizedEvent,
    SectionHorizontallyScrolledEvent,
    SpreadsheetVerticallyScrolledEvent,
} from '../Events/Events';
import { GridEvent } from './Model/GridEvent';
import { SpreadsheetState, SPREADSHEET_STATE_PROVIDERS } from './SpreadsheetState';
import { Subscription } from 'rxjs/Subscription';

const html = `
<GgDetailsBar></GgDetailsBar>
<GgHeader [rowCount]="headerRowCount" [numberTitleRowList]="numberTitleRowList" 
    [gridSectionList]="gridSectionList" [columnList]="columnList"></GgHeader>
<GgBody [numberDataRowList]="numberDataRowList" [gridSectionList]="gridSectionList" [scrollTop]="scrollTop"></GgBody>
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
        EVENT_PROVIDERS,
        SPREADSHEET_STATE_PROVIDERS,
    ],
    selector: 'NgSpreadsheet',
    template: html,
})
export class SpreadsheetComponent implements OnInit, OnDestroy {
    @Input('id') id: string;
    @Output() onGridEvent: EventEmitter<GridEvent<any>> = new EventEmitter<GridEvent<any>>(false);
    @ViewChild(BodyComponent) body: BodyComponent;
    columnList: Column[];
    statusMessage: string;
    statusMessageTimeout: number;
    gridSectionList: any[] = [];
    numberDataRowList: GridRow[] = [];
    numberTitleRowList: GridRow[] = [];
    headerRowCount: number = 0;
    rowHeight: number = 20;
    scrollTop: number = 0;
    unsubscribeGridSectionListChanges: () => void;

    private eventEmitterSubscription: Subscription;

    constructor(private el: ElementRef,
        private columnListGetter: ColumnListGetter,
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
        private gridComponentManager: GridComponentManager,
        @Inject(EVENT_EMITTER_TOKEN) private eventEmitter: EventEmitter<Event>,
        private columnPositionInformationMapCalculator: ColumnPositionInformationMapCalculator,
        private spreadsheetState: SpreadsheetState,
        private app: ApplicationRef) {

        this.gridComponentManager.set(<any>this);
        this.updateGridColumnMap(this.columnListManager.get());

        this.sectionPositionInformationMapUpdater.init();
        this.columnViewportUpdater.init();
        this.unsubscribeGridSectionListChanges = this.gridSectionListManager.subscribe((gridSectionList) => {
            this.updateGridSectionList(gridSectionList);
        });
    }

    ngOnInit() {
        this.eventEmitterSubscription = this.eventEmitter.subscribe((evt: Event) => {
            switch (evt.type) {
                case ColumnMovedEvent.type: {
                    let columnList = this.columnListManager.get();
                    this.columnList = columnList;

                    this.updateGridColumnMap(columnList);

                    this.recalculateGridData(columnList);
                    break;
                }
                case ColumnResizedEvent.type: {
                    let columnList = this.columnListManager.get();
                    this.columnList = columnList;

                    this.updateGridColumnMap(columnList);

                    let columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(columnList);
                    this.columnPositionInformationMapManager.set(columnPositionInformationMap);

                    this.updateBodySectionScrollWidth(columnPositionInformationMap);
                    this.gridSectionList.forEach(gc => this.columnViewportUpdater.update({
                        gridSectionName: gc.name,
                        scrollLeft: this.bodySectionScrollManager.get(gc.name),
                    }));

                    this.spreadsheetState = Object.assign({}, this.spreadsheetState, {
                        columnPositionInformationMap: columnPositionInformationMap,
                    });
                    break;
                }
                case SectionHorizontallyScrolledEvent.type: {
                    let scrollEvt = <SectionHorizontallyScrolledEvent>evt;
                    this.columnViewportUpdater.update({ gridSectionName: scrollEvt.payload.sectionName, scrollLeft: scrollEvt.payload.scrollLeft });
                    break;
                }
                case SpreadsheetVerticallyScrolledEvent.type: {
                    let scrollEvt = <SpreadsheetVerticallyScrolledEvent>evt;
                    this.scrollTop = scrollEvt.payload;
                    this.rowViewportUpdater.update(scrollEvt.payload);
                    this.updateGridSectionList(this.gridSectionListManager.get());
                    break;
                }
                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.eventEmitterSubscription.unsubscribe();
        this.unsubscribeGridSectionListChanges();
    }

    goToRow(rowNumber: number) {
        if (rowNumber > this.headerRowCount) {
            var scrollTop = this.rowHeight * (rowNumber - 1) - this.headerRowCount * this.rowHeight;
            this.eventEmitter.emit(new SpreadsheetVerticallyScrolledEvent(scrollTop));
        }
    }


    update(gridData: GridData) {
        this.gridDataManager.set(gridData);
        this.columnList = this.columnListGetter.get(gridData);

        this.recalculateGridData(this.columnList);

        this.columnListManager.set(this.columnList);

        var scrollTop = this.scrollTop;
        this.eventEmitter.emit(new SpreadsheetVerticallyScrolledEvent(scrollTop - 1));

        this.app.tick();

        this.eventEmitter.emit(new SpreadsheetVerticallyScrolledEvent(scrollTop));
    }

    updateStatusMessage(message: string, timeout?: number) {
        this.statusMessage = message;
        this.statusMessageTimeout = timeout;
    }


    @HostListener('focusin', ['$event'])
    private onFocus(evt: FocusEvent) {
        evt.preventDefault();
    }

    private gridSectionIdentity(index: number, gridSection: GridSection): any {
        if (gridSection) {
            return gridSection.name;
        }
        return 'gridSection_' + index;
    }


    private recalculateGridData(columnList: Column[]) {
        var gridData = this.gridDataManager.get();

        this.rowHeight = gridData.rowHeight || this.rowHeight;
        this.rowHeightManager.set(this.rowHeight);

        this.updateGridColumnMap(columnList);

        let columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(columnList);
        this.columnPositionInformationMapManager.set(columnPositionInformationMap);

        var gridSectionList = this.gridSectionListGetter.get(gridData, columnList);
        this.gridSectionListManager.set(gridSectionList);

        this.headerRowCount = gridSectionList[0].titleRowList.length;
        this.columnListManager.set(columnList);

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