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
} from '../../Model/Model';
import {
    DISPATCHER_TOKEN,
    Action,
    UpdateColumnSizeAction,
    MoveColumnAction,
    MoveColumnTypeEnum,
    FilterColumnAction,
} from '../../Events/Events';
import { ColumnMover } from './ColumnMover';
import { ColumnGetter } from './ColumnGetter';
import { Subscription } from 'rxjs/Subscription';

const css = `
:host {
    background-color: #E6E6E6;
    border-right: 1px inset #A3A3A3;
    text-align: center;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    position: relative;
    z-index: 5;
}

.filter-opener {
    display: block;
    position: absolute;
    right: 4px;
    top: 2px;
    width: 10px;
    height: 10px;
    font-size: 12px;
    cursor: pointer;
}

.filter {
    position: absolute;
    left: -1px;
    top: 20px;
    right: -1px;
    height: 20px;
    background-color: white;
    border: 1px solid #A3A3A3;
    display: none;
    border-top: none;
    z-index: 1;
}

.filter.is-visible {
    display: block;
}

.filter span {
    border: none;
    position: absolute;
    top: 2px;
    right: 4px;
    bottom: 2px;
    cursor: pointer;
}

.filter span:hover {
    color: black;
}

.filter-input-container {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 24px;
    bottom: 0px;
}

.filter-input-container input {
    border: none;
    background-color: white;
    width: 100%;
    height: 100%;
}
`;

const html = `
    <span>{{columnIdentifier}}</span>
    <span [class.is-filtered]="isFiltered" class="filter-opener" (click)="toggleFilter()">
        <i class="filter-opener-icon"></i>
    </span>
    <div *ngIf="isFilterOpen" class="filter" [class.is-visible]="isFilterOpen">
        <div class="filter-input-container">
            <input ref-filterExpression type="text" [value]="spreadsheetColumn.filterExpression" 
                (keypress)="$event.keyCode === 13 ? filter(filterExpression.value) : true"/>
        </div>
        <span (click)="filter(filterExpression.value)">
            <i class="filter-check-icon"></i>
        </span>
    </div>`;

@Component({
    selector: 'ColumnCell',
    template: html,
    styles: [css],
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

    spreadsheetCell: SpreadsheetCell;
    left: number;
    spreadsheetColumnIndex: number = 0;
    isFilterOpen: boolean = false;
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

    toggleFilter() {
        this.isFilterOpen = !this.isFilterOpen;
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
        var currentColumn = this.columnGetter.getBySpreadsheetColumnIndex(this.columnList, this.spreadsheetColumnIndex);
        if (currentColumn.sectionName === ColumnCellComponent.columnToMove.sectionName) {
            evt.preventDefault();
        };
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