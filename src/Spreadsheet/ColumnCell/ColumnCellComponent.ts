import {
    Directive,
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
} from '../../Events/Events';
import { ColumnMover } from './ColumnMover';
import { ColumnGetter } from './ColumnGetter';
import { Subscription } from 'rxjs/Subscription';

@Directive({
    selector: 'GgColumnCell',
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
    gridColumnIndex: number = 0;
    @Input('index') index: number;

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

        var maxColumnIndex = columnList.filter(c => c.gridSectionName === ColumnCellComponent.columnToMove.gridSectionName)
            .reduce((pv, cv) => Math.max(pv, cv.endIndex), 0);

        var elPosition = this.el.nativeElement.getBoundingClientRect();
        var middle = elPosition.left + elPosition.width / 2;
        if (evt.pageX > middle && newColumnIndex !== maxColumnIndex) {
            newColumnIndex = newColumnIndex + 1;
        } else {
            newColumnIndex = newColumnIndex;
        }

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