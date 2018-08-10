import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  HostListener,
  Renderer,
  SimpleChange,
  Inject,
  EventEmitter,
} from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import {
  Cell,
  SpreadsheetCell,
  Column,
  SpreadsheetColumn,
  ColumnPositionInformationMap,
} from '../../model';
import {
  DISPATCHER_TOKEN,
  Action,
  UpdateColumnSizeAction,
  MoveColumnAction,
  MoveColumnTypeEnum,
  FilterColumnAction,
  ToggleFilterAction,
} from '../../events/events';
import { ColumnMover } from './column-mover';
import { ColumnGetter } from './column-getter';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ColumnCell',
  templateUrl: './column-cell.component.html',
  styleUrls: ['./column-cell.component.css'],
})
export class ColumnCellComponent implements OnInit, OnDestroy, Cell {

  private static columnToMove: Column;

  @HostBinding('class.is-active') isActive: boolean = false;
  @HostBinding('style.width') width: number;
  @HostBinding('draggable') draggable: boolean = true;
  @HostBinding('style.margin-left.px') marginLeft: number = 0;
  @Input('spreadsheetColumn') spreadsheetColumn: SpreadsheetColumn;
  @Input('columnIdentifier') columnIdentifier: string;
  @Input('columnList') columnList: Column[];
  @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
  @Input('index') index: number;
  @Input('isFilterOpen') isFilterOpen: boolean = false;

  spreadsheetCell: SpreadsheetCell;
  left: number;
  spreadsheetColumnIndex: number = 0;
  isFiltered: boolean = false;

  constructor(private el: ElementRef,
    private renderer: Renderer,
    private columnMover: ColumnMover,
    private columnGetter: ColumnGetter,
    @Inject(DISPATCHER_TOKEN) private eventEmitter: EventEmitter<Action>) {

  }

  ngOnInit() {
    this.spreadsheetColumnIndex = this.spreadsheetColumn.index;
    this.updatePosition();
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['spreadsheetColumn']) {
      this.spreadsheetColumnIndex = this.spreadsheetColumn.index;
      this.isFiltered = this.spreadsheetColumn.filterExpression && this.spreadsheetColumn.filterExpression.length > 0;
    }
    if (changes['columnPositionInformationMap']) {

    }
    this.updatePosition();
  }

  ngOnDestroy() {
  }

  getElement(): HTMLElement {
    return this.el.nativeElement;
  }

  toggleFilter() {
    this.eventEmitter.emit(new ToggleFilterAction(this.spreadsheetColumnIndex));
  }

  filter(expression: string) {
    this.eventEmitter.emit(new FilterColumnAction(this.spreadsheetColumnIndex, expression));
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(evt: DragEvent) {
    var columnToMove = this.columnGetter.getBySpreadsheetColumnIndex(this.columnList, this.spreadsheetColumnIndex);
    if (columnToMove.endIndex !== columnToMove.startIndex) {
      evt.preventDefault();
    }
    ColumnCellComponent.columnToMove = columnToMove;
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(evt: DragEvent) {
    ColumnCellComponent.columnToMove = null;
  }

  @HostListener('dragover', ['$event'])
  onDragOver(evt: DragEvent) {
    if (!ColumnCellComponent.columnToMove) {
      return;
    }
    var currentColumn = this.columnGetter.getBySpreadsheetColumnIndex(this.columnList, this.spreadsheetColumnIndex);
    if (currentColumn.sectionName === ColumnCellComponent.columnToMove.sectionName) {
      evt.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(evt: DragEvent) {
    var columnToMove = ColumnCellComponent.columnToMove;
    var currentColumn = this.columnGetter.getBySpreadsheetColumnIndex(this.columnList, this.spreadsheetColumnIndex);
    var oldColumnIndex = this.columnList.indexOf(columnToMove);
    var newColumnIndex = this.columnList.indexOf(currentColumn);
    var moveType = newColumnIndex < oldColumnIndex ? MoveColumnTypeEnum.BeforeReferenceColumn : MoveColumnTypeEnum.AfterReferenceColumn;

    this.eventEmitter.emit(new MoveColumnAction(newColumnIndex, oldColumnIndex, columnToMove.name, currentColumn.name, moveType));
  }

  getScrollWidth() {
    return this.el.nativeElement.scrollWidth;
  }

  private updatePosition() {
    var columnPositionInformation = this.columnPositionInformationMap && this.columnPositionInformationMap[this.spreadsheetColumnIndex];
    if (!columnPositionInformation) {
      return;
    }
    if (this.index === 0) {
      this.marginLeft = columnPositionInformation.left;
    }
    this.width = columnPositionInformation.width;
  }
}