import {
    Directive,
    Input,
    HostBinding,
    ElementRef,
    HostListener,
    Renderer,
    SimpleChange,
} from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import {
    CellPositionUpdater,
    ColumnPositionInformationMapManager,
    ColumnPositionInformationMapCalculator,
    ColumnDefinitionListManager,
    ColumnListManager,
} from '../../Services/Services';
import {
    Cell,
    GridCell,
    Column,
    GridColumn,
} from '../../Model/Model';
import { ColumnMover } from './ColumnMover';
import { ColumnGetter } from './ColumnGetter';

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
    @Input('gridColumn') gridColumn: GridColumn;
    gridColumnIndex: number = 0;
    @Input('index') index: number;

    private columnInformationMapUnsubscriber: any;

    constructor(private el: ElementRef,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager,
        private columnListManager: ColumnListManager,
        private columnPositionInformationMapPositionCalculator: ColumnPositionInformationMapCalculator,
        private cellPositionUpdater: CellPositionUpdater,
        private renderer: Renderer,
        private columnMover: ColumnMover,
        private columnGetter: ColumnGetter) {

        this.columnInformationMapUnsubscriber = this.columnPositionInformationMapManager.subscribe((columnPositionInformationMap) => {
            this.cellPositionUpdater.update(this, columnPositionInformationMap);
            if (this.index === 0) {
                this.renderer.setElementStyle(this.el.nativeElement, 'margin-left', `${columnPositionInformationMap[this.gridColumnIndex].left}px`);
            }
        });
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

        var elPosition = this.el.nativeElement.getBoundingClientRect();
        var middle = elPosition.left + elPosition.width / 2;
        if (evt.pageX > middle) {
            newColumnIndex = newColumnIndex + 1;
        } else {
            newColumnIndex = newColumnIndex;
        }

        this.columnMover.moveColumn(oldColumnIndex, newColumnIndex);
    }

    ngOnInit() {
        this.gridColumnIndex = this.gridColumn.index;
        var columnPositionInformationMap = this.columnPositionInformationMapManager.get();
        this.cellPositionUpdater.update(this, columnPositionInformationMap);
        if (this.index === 0) {
            this.renderer.setElementStyle(this.el.nativeElement, 'margin-left', `${columnPositionInformationMap[this.gridColumnIndex].left}px`);
        }
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['gridColumn']) {
            this.gridColumnIndex = this.gridColumn.index;
            this.cellPositionUpdater.update(this, this.columnPositionInformationMapManager.get());
        }
        if (this.index === 0) {
            var columnPositionInformationMap = this.columnPositionInformationMapManager.get();
            this.renderer.setElementStyle(this.el.nativeElement, 'margin-left', `${columnPositionInformationMap[this.gridColumn.index].left}px`);
        }
    }

    ngOnDestroy() {
        this.columnInformationMapUnsubscriber();
    }

    getScrollWidth() {
        return this.el.nativeElement.scrollWidth;
    }
}