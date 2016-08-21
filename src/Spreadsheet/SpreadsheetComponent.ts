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
    OnChanges,
    Optional,
    Host,
    Renderer,
} from '@angular/core';
import { AfterContentInit, OnInit } from '@angular/core';
import { HeaderComponent } from './HeaderComponent';
import { BodyComponent } from './BodyComponent';
import { CELL_PROVIDERS } from './Cell/Cell';
import { COLUMN_CELL_PROVIDERS } from './ColumnCell/ColumnCell';
import { DetailsBarComponent } from './DetailsBarComponent';
import { StatusBarComponent } from './StatusBarComponent';
import { COLUMN_RESIZE_PROVIDERS } from './ColumnResize/ColumnResize';
import {
    GRID_SCOPE_SERVICES,
} from '../Services/Services';
import {
    ColumnPositionInformationMap,
    Column,
    ContentTypeEnum,
    GridSection,
    GridCell,
    GridRow,
    ColumnDefinition,
    GridColumn,
    ColumnDataTypeEnum,
    ExportData,
} from '../Model/Model';
import {
    DISPATCHER_TOKEN,
    DISPATCHER_PROVIDERS,
    Action,
    UpdateColumnSizeAction,
    ScrollGridSectionAction,
    ScrollSpreadsheetAction,
    FilterColumnAction,
    UpdateColumnDefinitionListAction,
    UpdateDataRowListAction,
    InitializeSpreadsheetSizeAction,
    UpdateSpreadsheetRowHeightAction,
    UpdateSpreadsheetSizeAction,
    UpdateSpreadsheetGetRowStyleFnAction,
    GoToCellLocationAction,
    ClearFilterAction,
} from '../Events/Events';
import { GridEvent } from './Model/GridEvent';
import { SpreadsheetState, SPREADSHEET_STATE_PROVIDERS } from './SpreadsheetState';
import { SpreadsheetStore } from './SpreadsheetStore';
import { Subscription } from 'rxjs/Subscription';

const html = `
<DetailsBar 
    [activeCellLocation]="spreadsheetState?.activeCellLocation"
    [gridColumnList]="spreadsheetState?.gridColumnList" 
    (download)="onDownload.emit(exportData())"></DetailsBar>
<Header [rowHeight]="spreadsheetState?.rowHeight" 
    [numberTitleRowList]="spreadsheetState?.numberTitleRowList"
    [gridSectionList]="spreadsheetState?.gridSectionList" 
    [columnList]="spreadsheetState?.columnList"
    [gridColumnList]="spreadsheetState?.gridColumnList"
    [columnPositionInformationMap]="spreadsheetState?.columnPositionInformationMap"
    [gridSectionScrollWidthMap]="spreadsheetState?.gridSectionScrollWidthMap"
    [gridSectionScrollLeftMap]="spreadsheetState?.gridSectionScrollLeftMap"
    [gridSectionPositionInformationMap]="spreadsheetState?.gridSectionPositionInformationMap"
    [gridSectionColumnToRendexIndexListMap]="spreadsheetState?.gridSectionColumnToRendexIndexListMap"></Header>
<Body [height]="spreadsheetState?.bodyHeight" 
    [rowHeight]="spreadsheetState?.rowHeight" 
    [numberDataRowList]="spreadsheetState?.numberDataRowList" 
    [gridSectionList]="spreadsheetState?.gridSectionList" 
    [scrollTop]="spreadsheetState?.scrollTop" 
    [columnPositionInformationMap]="spreadsheetState?.columnPositionInformationMap"
    [gridSectionScrollWidthMap]="spreadsheetState?.gridSectionScrollWidthMap"
    [gridSectionScrollLeftMap]="spreadsheetState?.gridSectionScrollLeftMap"
    [gridSectionPositionInformationMap]="spreadsheetState?.gridSectionPositionInformationMap"
    [activeCellLocation]="spreadsheetState?.activeCellLocation"></Body>
<StatusBar [message]="statusMessage" [timeout]="statusMessageTimeout"></StatusBar>`;

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
        DISPATCHER_PROVIDERS,
        SPREADSHEET_STATE_PROVIDERS,
        SpreadsheetStore,
    ],
    selector: 'NgSpreadsheet',
    template: html,
    styles: [`
    :host() {
        display: block;
    }`],
})
export class SpreadsheetComponent implements OnInit, OnDestroy, OnChanges {
    @Input('id') id: string;
    @Input('columnDefinitionList') columnDefinitionList: ColumnDefinition[];
    @Input('dataRowList') dataRowList: any[];
    @Input('rowHeight') rowHeight: number;
    @Input('height') height: number;
    @Input('rowClassGetter') rowClassGetter: (dataRow, rowType: ContentTypeEnum, rowIndex: number) => string;
    @Output('event') onSpreadsheetEvent: EventEmitter<GridEvent<any>> = new EventEmitter<any>(false);
    @Output('download') onDownload: EventEmitter<void> = new EventEmitter<void>(false);
    @ViewChild(BodyComponent) body: BodyComponent;
    statusMessage: string;
    statusMessageTimeout: number;

    get firstDataRowRowNumber() {
        return this.spreadsheetState.numberTitleRowList.length + 1;
    }

    private spreadsheetState: SpreadsheetState;
    private eventEmitterSubscription: Subscription;
    private windowResizeUnregisterFn: Function;

    constructor(private el: ElementRef,
        private cdr: ChangeDetectorRef,
        @Inject(DISPATCHER_TOKEN) private dispatcher: EventEmitter<Action>,
        private app: ApplicationRef,
        private renderer: Renderer,
        private spreadsheetStateGlobal: SpreadsheetState,
        private spreadsheetStore: SpreadsheetStore) {
        this.eventEmitterSubscription = this.dispatcher.subscribe((data: Action) => {
            this.onSpreadsheetEvent.emit({
                eventData: data,
                eventType: 'Action',
            });
        });
        this.spreadsheetStore.onChanged.subscribe((changedSpreadsheet) => {
            this.spreadsheetState = changedSpreadsheet;
            Object.assign(this.spreadsheetStateGlobal, changedSpreadsheet);
        });
    }

    ngOnInit() {
        var style = window.getComputedStyle(this.el.nativeElement);
        this.dispatcher.emit(new InitializeSpreadsheetSizeAction(this.height || parseInt(style.height, 10), parseInt(style.width, 10)));
        this.windowResizeUnregisterFn = this.renderer.listenGlobal('window', 'resize', () => {
            style = window.getComputedStyle(this.el.nativeElement);
            this.dispatcher.emit(new UpdateSpreadsheetSizeAction(this.height, parseInt(style.width, 10)));
        });
    }

    ngOnChanges(obj) {
        var changedFieldsCount = Object.keys(obj).length;
        if (obj.columnDefinitionList) {
            this.dispatcher.emit(new UpdateColumnDefinitionListAction((this.columnDefinitionList || [])));
        }
        if (obj.dataRowList) {
            this.dispatcher.emit(new UpdateDataRowListAction(this.dataRowList));
            //Possible fix to angular 2 render issue
            // setTimeout(() => this.dispatcher.emit(new ScrollSpreadsheetAction(this.spreadsheetState.scrollTop - 1)), 100);
            // setTimeout(() => this.dispatcher.emit(new ScrollSpreadsheetAction(this.spreadsheetState.scrollTop - 1)), 200);
        }
        if (obj.rowHeight) {
            this.dispatcher.emit(new UpdateSpreadsheetRowHeightAction(this.rowHeight));
        }
        if (obj.height) {
            var style = window.getComputedStyle(this.el.nativeElement);
            this.dispatcher.emit(new UpdateSpreadsheetSizeAction(this.height, parseInt(style.width, 10)));
        }
        if (obj.rowClassGetter) {
            this.dispatcher.emit(new UpdateSpreadsheetGetRowStyleFnAction(this.rowClassGetter));
        }
    }

    ngOnDestroy() {
        this.eventEmitterSubscription.unsubscribe();
        this.windowResizeUnregisterFn();
    }

    getActiveCell() {
        var cellLocation = this.spreadsheetState.activeCellLocation;
        var gridColumn = this.spreadsheetState.gridColumnList.find(gc => gc.index === cellLocation.gridColumnIndex);
        var gridSection = this.spreadsheetState.gridSectionList.find(gs => gs.name === gridColumn.name);
        var gridRow = gridSection.dataRowList.find(dr => dr.rowIndex === cellLocation.rowIndex);
        var gridCell = gridRow.cellList.find(c => c.columnIndex === gridColumn.index);
        return gridCell;
    }

    exportData(): ExportData {
        var rowList: GridRow[] = new Array(this.spreadsheetState.gridSectionList[0].dataRowList.length);
        var columnListLength = this.spreadsheetState.gridColumnList.length;
        var gridColumnMap: { [index: number]: GridColumn } = {};
        this.spreadsheetState.gridColumnList.forEach(gc => gridColumnMap[gc.index] = gc);
        this.spreadsheetState.gridSectionList.forEach(gridSection => {
            gridSection.titleRowList.forEach(tr => {
                if (!rowList[tr.rowIndex]) {
                    rowList[tr.rowIndex] = tr;
                }
                if (tr !== rowList[tr.rowIndex]) {
                    rowList[tr.rowIndex].cellList = rowList[tr.rowIndex].cellList.concat(tr.cellList);
                }
            });
            gridSection.dataRowList.forEach(tr => {
                if (!rowList[tr.rowIndex]) {
                    rowList[tr.rowIndex] = tr;
                }
                if (tr !== rowList[tr.rowIndex]) {
                    rowList[tr.rowIndex].cellList = rowList[tr.rowIndex].cellList.concat(tr.cellList);
                }
            });
        });
        return {
            rowList: rowList,
            columnList: this.spreadsheetState.columnList,
        };
    }

    goToRow(rowNumber: number) {
        if (rowNumber >= this.firstDataRowRowNumber) {
            var rowIndex = (rowNumber - 1);
            var gridColumnIndex = this.spreadsheetState.activeCellLocation.gridColumnIndex;
            this.dispatcher.emit(new GoToCellLocationAction(rowIndex, gridColumnIndex, false));
            this.cdr.markForCheck();
        }
    }

    clearFilter() {
        this.dispatcher.emit(new ClearFilterAction());
        this.cdr.markForCheck();
    }

    updateStatusMessage(message: string, timeout?: number) {
        setTimeout(() => {
            this.statusMessage = message;
            this.statusMessageTimeout = timeout;
        }, 100);
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
}