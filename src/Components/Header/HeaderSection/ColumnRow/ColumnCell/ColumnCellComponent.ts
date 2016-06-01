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
} from '../../../../../Services/Services';
import { Cell } from '../../../../../Model/Cell';
import { GridCell } from '../../../../../Model/GridCell';
import { Column } from '../../../../../Model/Column';
import { GridColumn } from '../../../../../Model/GridColumn';

@Directive({
    selector: 'GgColumnCell',
})
export class ColumnCellComponent implements OnInit, OnDestroy, Cell {

    private static columnToMove: Column;
    private static columnList: Column[];

    gridCell: GridCell;
    @HostBinding('class.is-active') isActive: boolean = false;
    @HostBinding('style.width') width: number;
    left: number;
    @HostBinding('draggable') draggable: boolean = true;
    @Input('gridColumn') gridColumn: GridColumn;
    columnIndex: number = 0;
    @Input('index') index: number;

    private columnInformationMapUnsubscriber: any;

    constructor(private el: ElementRef,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager,
        private columnListManager: ColumnListManager,
        private columnPositionInformationMapPositionCalculator: ColumnPositionInformationMapCalculator,
        private cellPositionUpdater: CellPositionUpdater,
        private renderer: Renderer) {

        this.columnInformationMapUnsubscriber = this.columnPositionInformationMapManager.subscribe((columnPositionInformationMap) => {
            this.cellPositionUpdater.update(this, columnPositionInformationMap);
            if (this.index === 0) {
                this.renderer.setElementStyle(this.el.nativeElement, 'margin-left', `${columnPositionInformationMap[this.columnIndex].left}px`);
            }
        });
    }

    @HostListener('dragstart', ['$event'])
    onDragStart(evt: DragEvent) {
        ColumnCellComponent.columnList = _.cloneDeep(this.columnListManager.get());
        var columnToMove = ColumnCellComponent.columnList.find(c => c.startIndex <= this.columnIndex && c.endIndex >= this.columnIndex);
        if (columnToMove.endIndex !== columnToMove.startIndex) {
            evt.preventDefault();
        }
        ColumnCellComponent.columnToMove = columnToMove;
    }

    @HostListener('dragend', ['$event'])
    onDragEnd(evt: DragEvent) {
        ColumnCellComponent.columnToMove = null;
        ColumnCellComponent.columnList = [];
    }

    @HostListener('dragover', ['$event'])
    onDragOver(evt: DragEvent) {
        var columnToTarget = ColumnCellComponent.columnList.find(c => c.startIndex <= this.columnIndex && c.endIndex >= this.columnIndex);
        if (columnToTarget.endIndex !== columnToTarget.startIndex) {
            return;
        }
        evt.preventDefault();

        var columnList = ColumnCellComponent.columnList;
        var columnToMove = ColumnCellComponent.columnToMove;

        if (!columnToMove) {
            return;
        }

        var elPosition = this.el.nativeElement.getBoundingClientRect();
        var middle = elPosition.left + elPosition.width / 2;

        var columnToMoveIndex = columnList.indexOf(columnToMove);
        var columnToTargetIndex = columnList.indexOf(columnToTarget);

        if (columnToMove === columnToTarget) {
            return;
        }

        columnList.splice(columnToMoveIndex, 1);
        var toMoveIndex = 0;
        var targetIndex = 0;
        if (evt.pageX > middle) {
            columnList.splice(columnToTargetIndex + 1, 0, columnToMove);
        } else {
            columnList.splice(columnToTargetIndex, 0, columnToMove);
        }
    }

    @HostListener('drop', ['$event'])
    onDrop(evt: DragEvent) {
        ColumnCellComponent.columnToMove = null;
        this.columnListManager.set(ColumnCellComponent.columnList);
    }

    ngOnInit() {
        this.columnIndex = this.gridColumn.index;
        var columnPositionInformationMap = this.columnPositionInformationMapManager.get();
        this.cellPositionUpdater.update(this, columnPositionInformationMap);
        if (this.index === 0) {
            this.renderer.setElementStyle(this.el.nativeElement, 'margin-left', `${columnPositionInformationMap[this.columnIndex].left}px`);
        }
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['gridColumn']) {
            this.columnIndex = this.gridColumn.index;
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