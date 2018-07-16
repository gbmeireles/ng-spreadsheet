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
import { BodyComponent } from './body';
import { CELL_PROVIDERS } from './cell';
import { COLUMN_CELL_PROVIDERS } from './column-cell';
import { COLUMN_RESIZE_PROVIDERS } from './column-resize';
import {
  SPREADSHEET_SCOPE_PROVIDERS,
  CellManager,
} from '../services/services';
import {
  ColumnPositionInformationMap,
  Column,
  ContentTypeEnum,
  SpreadsheetSection,
  SpreadsheetCell,
  SpreadsheetRow,
  ColumnDefinition,
  SpreadsheetColumn,
  ColumnDataTypeEnum,
  ExportData,
} from '../model';
import {
  DISPATCHER_TOKEN,
  DISPATCHER_PROVIDERS,
  Action,
  UpdateColumnSizeAction,
  ScrollSpreadsheetSectionAction,
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
} from '../events/events';
import { SpreadsheetEvent } from './model/spreadsheet-event';
import { SpreadsheetState, SPREADSHEET_STATE_PROVIDERS } from './spreadsheet-state';
import { SpreadsheetStore } from './spreadsheet-store';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SPREADSHEET_SCOPE_PROVIDERS,
    COLUMN_RESIZE_PROVIDERS,
    COLUMN_CELL_PROVIDERS,
    CELL_PROVIDERS,
    DISPATCHER_PROVIDERS,
    SPREADSHEET_STATE_PROVIDERS,
    SpreadsheetStore,
  ],
  selector: 'NgSpreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css'],
})
export class SpreadsheetComponent implements OnInit, OnDestroy, OnChanges {
  @Input('id') id: string;
  @Input('columnDefinitionList') columnDefinitionList: ColumnDefinition[];
  @Input('dataRowList') dataRowList: any[];
  @Input('rowHeight') rowHeight: number;
  @Input('titleRowHeight') titleRowHeight: number;
  @Input('height') height: number;
  @Input('defaultDetailsBarMessage') defaultDetailsBarMessage: string;
  @Input('rowClassGetter') rowClassGetter: (dataRow, rowType: ContentTypeEnum, rowIndex: number) => string;

  @Output('event') onSpreadsheetEvent = new Subject<any>();
  @Output('state') onStateChanged = new BehaviorSubject<SpreadsheetState>(new SpreadsheetState());
  @Output('download') onDownload = new Subject<ExportData>();
  @Output('toggleFullScreen') onToggleFullScreen = new Subject<boolean>();

  @ViewChild(BodyComponent) body: BodyComponent;

  statusMessage: string;
  statusMessageTimeout: number;
  statusMessageCount: number = 0;

  get firstDataRowRowNumber() {
    return this.spreadsheetState.numberTitleRowList.length + 1;
  }

  spreadsheetState: SpreadsheetState;
  private eventEmitterSubscription: Subscription;
  private windowResizeUnregisterFn: Function;

  constructor(private el: ElementRef,
    private cdr: ChangeDetectorRef,
    @Inject(DISPATCHER_TOKEN) private dispatcher: EventEmitter<Action>,
    private app: ApplicationRef,
    private renderer: Renderer,
    private spreadsheetStateGlobal: SpreadsheetState,
    private spreadsheetStore: SpreadsheetStore,
    private cellManager: CellManager) {
    this.eventEmitterSubscription = this.dispatcher.subscribe((data: Action) => {
      this.onSpreadsheetEvent.next({
        eventData: data,
        eventType: 'Action',
      });
    });
    this.spreadsheetStore.onChanged.subscribe((changedSpreadsheet) => {
      this.spreadsheetState = changedSpreadsheet;
      Object.assign(this.spreadsheetStateGlobal, changedSpreadsheet);
      this.onStateChanged.next(this.spreadsheetState);
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
    if (obj.columnDefinitionList) {
      this.dispatcher.emit(new UpdateColumnDefinitionListAction((this.columnDefinitionList || [])));
    }
    if (obj.dataRowList) {
      this.dispatcher.emit(new UpdateDataRowListAction(this.dataRowList));
    }
    if (obj.rowHeight) {
      if (!this.titleRowHeight) {
        this.titleRowHeight = this.rowHeight;
      }
      this.dispatcher.emit(new UpdateSpreadsheetRowHeightAction(this.rowHeight, this.titleRowHeight));
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

  recalculateDimensions() {
    setTimeout(() => {
      var style = window.getComputedStyle(this.el.nativeElement);
      this.dispatcher.emit(new UpdateSpreadsheetSizeAction(this.height || parseInt(style.height, 10), parseInt(style.width, 10)));
      this.cdr.markForCheck();
    }, 200);
  }

  getElement(): HTMLElement {
    return this.el.nativeElement;
  }

  getActiveCell(): { cell: SpreadsheetCell, element: HTMLElement, rowData: any } {
    var cellLocation = this.spreadsheetState.activeCellLocation;
    var spreadsheetColumn = this.spreadsheetState.spreadsheetColumnList.find(gc => gc.index === cellLocation.columnIndex);
    var spreadsheetSection = this.spreadsheetState.spreadsheetSectionList.find(gs => gs.name === spreadsheetColumn.sectionName);
    var spreadsheetRow = spreadsheetSection.dataRowList.find(dr => dr.rowIndex === cellLocation.rowIndex);
    if (!spreadsheetRow) {
      return null;
    }

    var spreadsheetCell = spreadsheetRow.cellList.find(c => c.columnIndex === spreadsheetColumn.index);
    if (!spreadsheetCell) {
      return null;
    }

    var cell = this.cellManager.getCellByPosition(spreadsheetCell.columnIndex, spreadsheetCell.rowIndex);

    return {
      cell: spreadsheetCell,
      rowData: spreadsheetRow.rowData,
      element: cell.getElement(),
    };
  }

  exportData(): ExportData {
    var rowList: SpreadsheetRow[] = new Array(this.spreadsheetState.spreadsheetSectionList[0].dataRowList.length);
    var spreadsheetColumnMap: { [index: number]: SpreadsheetColumn } = {};
    this.spreadsheetState.spreadsheetColumnList.forEach(gc => spreadsheetColumnMap[gc.index] = gc);
    this.spreadsheetState.spreadsheetSectionList.forEach(spreadsheetSection => {
      spreadsheetSection.titleRowList.forEach(tr => {
        if (!rowList[tr.rowIndex]) {
          rowList[tr.rowIndex] = tr;
        }
        if (tr !== rowList[tr.rowIndex]) {
          rowList[tr.rowIndex].cellList = rowList[tr.rowIndex].cellList.concat(tr.cellList);
        }
      });
      spreadsheetSection.dataRowList.forEach(tr => {
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
      var spreadsheetColumnIndex = this.spreadsheetState.activeCellLocation.columnIndex;
      this.dispatcher.emit(new GoToCellLocationAction(rowIndex, spreadsheetColumnIndex, false, true, true));
      this.cdr.markForCheck();
    }
  }

  goToRowByRowData(rowData: any) {
    var row = this.spreadsheetState.dataSpreadsheetRowList.find(sr => sr.rowData === rowData);
    var spreadsheetColumnIndex = this.spreadsheetState.activeCellLocation.columnIndex;
    var action = new GoToCellLocationAction(row.rowIndex, spreadsheetColumnIndex, false, true, true);
    action.payload.rowData = rowData;
    this.dispatcher.emit(action);
    this.cdr.markForCheck();
  }

  resizeColumn(columnName: string, newSize: number) {
    this.dispatcher.emit(new UpdateColumnSizeAction(columnName, newSize));
    this.cdr.markForCheck();
  }

  clearFilter() {
    this.dispatcher.emit(new ClearFilterAction());
    this.cdr.markForCheck();
  }

  updateStatusMessage(message: string, timeout?: number) {
    setTimeout(() => {
      this.statusMessage = message;
      this.statusMessageTimeout = timeout;
      this.statusMessageCount++;
      this.cdr.markForCheck();
    }, 100);
  }

  @HostListener('focusin', ['$event'])
  private onFocus(evt: FocusEvent) {
    evt.preventDefault();
  }

  private spreadsheetSectionIdentity(index: number, spreadsheetSection: SpreadsheetSection): any {
    if (spreadsheetSection) {
      return spreadsheetSection.name;
    }
    return 'spreadsheetSection_' + index;
  }
}