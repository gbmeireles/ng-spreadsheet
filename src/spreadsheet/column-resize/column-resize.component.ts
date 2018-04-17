import { Component, Input, ElementRef, HostBinding, HostListener, Renderer, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Inject, EventEmitter, Host } from '@angular/core';
import {
  DISPATCHER_TOKEN,
  Action,
  UpdateColumnSizeAction,
} from '../../events/events';
import { SpreadsheetColumn, ColumnPositionInformationMap } from '../../model';
import { ColumnTargetWidthGetter } from './column-target-width-getter';
import { ColumnSizeUpdater } from './column-size-updater';
import { MousePositionGetter } from './mouse-position-getter';
import { Subscription } from 'rxjs';
import { MIN_COLUMN_SIZE } from '../spreadsheet-constants';

@Component({
  selector: 'ColumnResize',
  templateUrl: './column-resize.component.html',
  styleUrls: ['./column-resize.component.css'],
})
export class ColumnResizeComponent implements OnInit, OnDestroy {
  @Input('spreadsheetColumn') spreadsheetColumn: SpreadsheetColumn;
  @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
  @HostBinding('class.is-active') isDragging: boolean = false;
  @HostBinding('style.left') left: number;

  private isInitialized: boolean = false;
  private originalLeft: number = 0;
  private startPosition: number = 0;
  private currentPosition: number = 0;

  private removeMouseMoveListener: Function;
  private removeMouseUpListener: Function;

  constructor(private el: ElementRef,
    private renderer: Renderer,
    private app: ApplicationRef,
    private columnTargetWidthGetter: ColumnTargetWidthGetter,
    private columnSizeUpdater: ColumnSizeUpdater,
    private mousePositionGetter: MousePositionGetter,
    @Inject(DISPATCHER_TOKEN) private eventEmitter: EventEmitter<Action>,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.updateHandlerPosition();
  }

  ngOnChanges(obj) {
    if (obj['columnPositionInformationMap'] || obj['spreadsheetColumn']) {
      var positionInformation = this.columnPositionInformationMap
        && this.spreadsheetColumn
        && this.columnPositionInformationMap[this.spreadsheetColumn.index];

      if (positionInformation) {
        this.left = positionInformation.left + positionInformation.width - 2;
      }
    }
  }

  ngOnDestroy() {
  }

  updateHandlerPosition() {
  }

  @HostListener('dblclick', ['$event'])
  private onDoubleClick(evt: MouseEvent) {
    this.eventEmitter.emit(new UpdateColumnSizeAction(this.spreadsheetColumn.name, 50));
    this.app.tick();

    var newColumnSize = this.columnTargetWidthGetter.getTargetWidth(this.spreadsheetColumn.index);
    this.eventEmitter.emit(new UpdateColumnSizeAction(this.spreadsheetColumn.name, newColumnSize));
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
    var newColumnSize = this.spreadsheetColumn.width + (this.currentPosition - this.startPosition);
    if (newColumnSize >= MIN_COLUMN_SIZE) {
      this.left = this.originalLeft + movementX;
      this.cdr.markForCheck();
    }
  }

  private onMouseUp(evt: MouseEvent) {
    this.removeResizeListeners();

    if (!this.isDragging) {
      return;
    }

    this.isDragging = false;

    this.currentPosition = this.mousePositionGetter.getPosition(evt).x;

    var newColumnSize = this.spreadsheetColumn.width + (this.currentPosition - this.startPosition);
    this.eventEmitter.emit(new UpdateColumnSizeAction(this.spreadsheetColumn.name, newColumnSize));

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