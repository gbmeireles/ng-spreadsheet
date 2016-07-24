import { Component, Input, ElementRef, HostBinding, HostListener, Renderer, ApplicationRef } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Inject, forwardRef, Host } from '@angular/core';
import {
    ColumnListManager,
    ColumnPositionInformationMapManager,
    ColumnPositionInformationMapCalculator,
    RowHeightManager,
    CellListMapManager,
} from '../../../../Services/Services';
import { GridColumn } from '../../../../Model/GridColumn';
import { ColumnPositionInformationMap } from '../../../../Model/ColumnPositionInformationMap';
import * as _ from 'lodash';

var css = `
div {
    width: 4px;
    cursor: col-resize;
    display: block;
    position: absolute;
    top: 0;
    opacity: 0;
    background-color: black;
    transition: opacity 0.4s ease-out;
}

div:hover, div.active {
    opacity: 1;
    transition: opacity 0.4s ease-out;
}`;

var html = `<div [class.active]="isDragging" [style.height]="height" [style.left]="left"></div>`;

@Component({
    moduleId: module.id,
    selector: 'GgColumnResize',
    styles: [css],
    template: html,
})
export class ColumnResizeComponent implements OnInit, OnDestroy {
    @Input('gridColumn') gridColumn: GridColumn;
    isDragging: boolean = false;
    height: number;
    left: number;

    private isInitialized: boolean = false;
    private originalLeft: number = 0;
    private startPosition: number = 0;
    private currentPosition: number = 0;

    private removeMouseMoveListener: Function;
    private removeMouseUpListener: Function;
    private columnInformationMapUnsubscribe: any;

    constructor(private el: ElementRef,
        private renderer: Renderer,
        private app: ApplicationRef,
        private columnListManager: ColumnListManager,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager,
        private columnPositionInformationMapCalculator: ColumnPositionInformationMapCalculator,
        private rowHeightManager: RowHeightManager,
        private cellListMapManager: CellListMapManager) {
    }

    updateHandlerPosition(columnPositionInformationMap: ColumnPositionInformationMap) {
        var columnPositionInformation = columnPositionInformationMap[this.gridColumn.index];
        if (!columnPositionInformation) {
            return;
        }
        this.left = columnPositionInformation.left + columnPositionInformation.width - Math.round(this.el.nativeElement.clientWidth / 2);
    }

    ngOnInit() {
        this.updateHandlerPosition(this.columnPositionInformationMapManager.get());
        this.columnInformationMapUnsubscribe = this.columnPositionInformationMapManager.subscribe((columnPositionInformationMap) => {
            this.updateHandlerPosition(columnPositionInformationMap);
        });
        this.height = this.rowHeightManager.get();
    }

    ngOnDestroy() {
        this.columnInformationMapUnsubscribe();
    }

    @HostListener('dblclick', ['$event'])
    private onDoubleClick(evt: MouseEvent) {
        var columnList = _.cloneDeep(this.columnListManager.get());
        var column = columnList.find(c => c.name == this.gridColumn.name);
        if (!column) {
            return;
        }

        column.width = 50;
        var columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(columnList);
        this.columnPositionInformationMapManager.set(columnPositionInformationMap);
        this.app.tick();

        column.width = this.getTargetWidth();
        columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(columnList);
        this.columnPositionInformationMapManager.set(columnPositionInformationMap);
        this.columnListManager.set(columnList);
    }

    private getTargetWidth(): number {
        return this.cellListMapManager.getCellList(this.gridColumn.name).reduce((targetWidth, cell) => {
            return Math.max(cell.getScrollWidth(), targetWidth);
        }, 50) + 5;
    }

    @HostListener('mousedown', ['$event'])
    @HostListener('touchstart', ['$event'])
    private onMouseDown(evt: MouseEvent) {
        this.removeResizeListeners();

        evt.preventDefault();

        this.originalLeft = this.left;
        this.startPosition = this.getPointerX(evt);

        if (evt.type.indexOf('touch') === 0) {
            this.removeMouseMoveListener = this.renderer.listenGlobal('document', 'touchmove', this.onMouseMove.bind(this));
            this.removeMouseUpListener = this.renderer.listenGlobal('document', 'touchend', this.onMouseUp.bind(this));
        } else {
            this.removeMouseMoveListener = this.renderer.listenGlobal('document', 'mousemove', this.onMouseMove.bind(this));
            this.removeMouseUpListener = this.renderer.listenGlobal('document', 'mouseup', this.onMouseUp.bind(this));
        }
    }

    private onMouseMove(evt: MouseEvent) {
        this.currentPosition = this.getPointerX(evt);
        var movementX = this.currentPosition - this.startPosition;
        if (!this.isDragging && Math.abs(movementX) > 0) {
            this.isDragging = true;
        }
        this.left = this.originalLeft + movementX;
    }

    private onMouseUp(evt: MouseEvent) {
        this.removeResizeListeners();

        if (!this.isDragging) {
            return;
        }

        this.isDragging = false;

        var columnList = _.cloneDeep(this.columnListManager.get());
        var column = columnList.find(c => c.name == this.gridColumn.name);
        if (!column) {
            return;
        }

        this.currentPosition = this.getPointerX(evt);

        var columnPositionInformationMap = this.columnPositionInformationMapManager.get();

        column.width = columnPositionInformationMap[column.startIndex].width + (this.currentPosition - this.startPosition);

        columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(columnList);
        this.columnPositionInformationMapManager.set(columnPositionInformationMap);

        this.startPosition = 0;
        this.currentPosition = 0;
        this.columnListManager.set(columnList);
    }

    private removeResizeListeners() {
        if (this.removeMouseUpListener) {
            this.removeMouseUpListener();
        }
        if (this.removeMouseMoveListener) {
            this.removeMouseMoveListener();
        }

        this.removeMouseUpListener = null;
        this.removeMouseMoveListener = null;
    }

    private getPointerX(evt: TouchEvent | MouseEvent) {
        if (evt.type.indexOf('touch') === 0) {
            return ((<TouchEvent>evt).touches[0] || (<TouchEvent>evt).changedTouches[0]).pageX;
        }
        return (<MouseEvent>evt).pageX;
    }
}