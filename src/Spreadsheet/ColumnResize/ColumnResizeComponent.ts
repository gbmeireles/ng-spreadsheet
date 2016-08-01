import { Component, Input, ElementRef, HostBinding, HostListener, Renderer, ApplicationRef } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Inject, EventEmitter, forwardRef, Host } from '@angular/core';
import {
    ColumnPositionInformationMapManager,
    ColumnPositionInformationMapCalculator,
    RowHeightManager,
} from '../../Services/Services';
import {
    EVENT_EMITTER_TOKEN,
    Event,
    ColumnResizedEvent,
    ColumnMovedEvent,
} from '../../Events/Events';
import { GridColumn, ColumnPositionInformationMap } from '../../Model/Model';
import { ColumnTargetWidthGetter } from './ColumnTargetWidthGetter';
import { ColumnSizeUpdater } from './ColumnSizeUpdater';
import { MousePositionGetter } from './MousePositionGetter';
import { Subscription } from 'rxjs/Subscription';

var css = `
:host {
    display: block;
    position: absolute;
    width: 4px;
    cursor: col-resize;
    top: 0;
    opacity: 0;
    background-color: black;
    transition: opacity 0.4s ease-out;
}

:host:hover, :host.is-active {
    opacity: 1;
    transition: opacity 0.4s ease-out;
}`;

var html = `<div></div>`;

@Component({
    selector: 'GgColumnResize',
    styles: [css],
    template: html,
})
export class ColumnResizeComponent implements OnInit, OnDestroy {
    @Input('gridColumn') gridColumn: GridColumn;
    @HostBinding('class.is-active') isDragging: boolean = false;
    @HostBinding('style.height') height: number;
    @HostBinding('style.left') left: number;

    private isInitialized: boolean = false;
    private originalLeft: number = 0;
    private startPosition: number = 0;
    private currentPosition: number = 0;

    private removeMouseMoveListener: Function;
    private removeMouseUpListener: Function;

    private eventEmitterSubscription: Subscription;

    constructor(private el: ElementRef,
        private renderer: Renderer,
        private app: ApplicationRef,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager,
        private columnPositionInformationMapCalculator: ColumnPositionInformationMapCalculator,
        private rowHeightManager: RowHeightManager,
        private columnTargetWidthGetter: ColumnTargetWidthGetter,
        private columnSizeUpdater: ColumnSizeUpdater,
        private mousePositionGetter: MousePositionGetter,
        @Inject(EVENT_EMITTER_TOKEN) private eventEmitter: EventEmitter<Event>) {
    }

    ngOnInit() {
        this.updateHandlerPosition();
        this.eventEmitterSubscription = this.eventEmitter.subscribe((evt: Event) => {
            switch (evt.type) {
                case ColumnResizedEvent.type:
                case ColumnMovedEvent.type:
                    this.updateHandlerPosition();
                    break;
                default:
                    break;
            }
        });
        this.height = this.rowHeightManager.get();
    }

    ngOnDestroy() {
        this.eventEmitterSubscription.unsubscribe();
    }

    updateHandlerPosition() {
        var columnPositionInformationMap = this.columnPositionInformationMapManager.get();
        var columnPositionInformation = columnPositionInformationMap[this.gridColumn.index];
        if (!columnPositionInformation) {
            return;
        }
        this.left = columnPositionInformation.left + columnPositionInformation.width - Math.round(this.el.nativeElement.clientWidth / 2);
    }

    @HostListener('dblclick', ['$event'])
    private onDoubleClick(evt: MouseEvent) {
        this.columnSizeUpdater.updateColumnSize(this.gridColumn.name, 50);
        this.app.tick();

        var newColumnSize = this.columnTargetWidthGetter.getTargetWidth(this.gridColumn.name);
        this.columnSizeUpdater.updateColumnSize(this.gridColumn.name, newColumnSize);
    }

    @HostListener('mousedown', ['$event'])
    @HostListener('touchstart', ['$event'])
    private onMouseDown(evt: MouseEvent) {
        this.removeResizeListeners();

        evt.preventDefault();

        this.originalLeft = this.left;
        this.startPosition = this.mousePositionGetter.getPosition(evt).x;

        if (evt.type.indexOf('touch') === 0) {
            this.removeMouseMoveListener = this.renderer.listenGlobal('document', 'touchmove', this.onMouseMove.bind(this));
            this.removeMouseUpListener = this.renderer.listenGlobal('document', 'touchend', this.onMouseUp.bind(this));
        } else {
            this.removeMouseMoveListener = this.renderer.listenGlobal('document', 'mousemove', this.onMouseMove.bind(this));
            this.removeMouseUpListener = this.renderer.listenGlobal('document', 'mouseup', this.onMouseUp.bind(this));
        }
    }

    private onMouseMove(evt: MouseEvent) {
        this.currentPosition = this.mousePositionGetter.getPosition(evt).x;
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

        this.currentPosition = this.mousePositionGetter.getPosition(evt).x;

        var newColumnSize = this.gridColumn.width + (this.currentPosition - this.startPosition);
        this.columnSizeUpdater.updateColumnSize(this.gridColumn.name, newColumnSize);

        this.startPosition = 0;
        this.currentPosition = 0;
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
}