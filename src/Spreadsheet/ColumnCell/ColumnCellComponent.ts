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
    ColumnListManager,
    ColumnPositionInformationMapManager,
} from '../../Services/Services';
import {
    Cell,
    GridCell,
    Column,
    GridColumn,
    ColumnPositionInformationMap,
} from '../../Model/Model';
import {
    EVENT_EMITTER_TOKEN,
    Event,
    ColumnResizedEvent,
    ColumnMovedEvent,
    FilterColumnEvent,
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

.filter input {
    border: none;
    position: absolute;
    top: 2px;
    left: 4px;
    right: 24px;
    bottom: 2px;
    background-color: white;
}

.filter span {
    border: none;
    position: absolute;
    top: 2px;
    right: 4px;
    bottom: 2px;
}
`;

const html = `
    <span>{{columnIdentifier}}</span>
    <span class="filter-opener" (click)="toggleFilter()"><i class="fa fa-caret-square-o-down"></i></span>
    <div class="filter" [class.is-visible]="isFilterOpen">
        <input ref-filterExpression type="text" />
        <span (click)="filter(filterExpression.value)"><i class="fa fa-check"></i></span>
    </div>`;

@Component({
    selector: 'GgColumnCell',
    template: html,
    styles: [css],
})
export class ColumnCellComponent implements OnInit, OnDestroy, Cell {

    private static columnToMove: Column;

    gridCell: GridCell;
    @HostBinding('class.is-active') isActive: boolean = false;
    @HostBinding('style.width') width: number;
    left: number;
    @HostBinding('draggable') draggable: boolean = true;
    @HostBinding('style.margin-left.px') marginLeft: number = 0;
    @Input('gridColumn') gridColumn: GridColumn;
    @Input('columnIdentifier') columnIdentifier: string;
    gridColumnIndex: number = 0;
    @Input('index') index: number;
    isFilterOpen: boolean = false;

    private eventEmitterSubscription: Subscription;

    constructor(private el: ElementRef,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager,
        private columnListManager: ColumnListManager,
        private renderer: Renderer,
        private columnMover: ColumnMover,
        private columnGetter: ColumnGetter,
        @Inject(EVENT_EMITTER_TOKEN) private eventEmitter: EventEmitter<Event>) {

    }

    ngOnInit() {
        this.eventEmitterSubscription = this.eventEmitter.subscribe((evt: Event) => {
            switch (evt.type) {
                case ColumnResizedEvent.type:
                case ColumnMovedEvent.type:
                    this.updatePosition();
                    break;
                default:
                    break;
            }
        });
        this.gridColumnIndex = this.gridColumn.index;
        this.updatePosition();
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['gridColumn']) {
            this.gridColumnIndex = this.gridColumn.index;
        }
        this.updatePosition();
    }

    ngOnDestroy() {
        this.eventEmitterSubscription.unsubscribe();
    }

    toggleFilter() {
        this.isFilterOpen = !this.isFilterOpen;
    }

    filter(expression: string) {
        this.eventEmitter.emit(new FilterColumnEvent(this.gridColumnIndex, expression));
    }

    @HostListener('dragstart', ['$event'])
    onDragStart(evt: DragEvent) {
        var columnToMove = this.columnGetter.getByGridColumnIndex(this.gridColumnIndex);
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
        evt.preventDefault();
    }

    @HostListener('drop', ['$event'])
    onDrop(evt: DragEvent) {
        var columnList = this.columnListManager.get();

        var currentColumn = this.columnGetter.getByGridColumnIndex(this.gridColumnIndex);
        var oldColumnIndex = columnList.indexOf(ColumnCellComponent.columnToMove);
        var newColumnIndex = columnList.indexOf(currentColumn);

        this.columnMover.moveColumn(oldColumnIndex, newColumnIndex);
    }

    getScrollWidth() {
        return this.el.nativeElement.scrollWidth;
    }

    private updatePosition() {
        var columnPositionInformation = this.columnPositionInformationMapManager.get()[this.gridColumnIndex];
        if (this.index === 0) {
            this.marginLeft = columnPositionInformation.left;
        }
        this.width = columnPositionInformation.width;
    }
}