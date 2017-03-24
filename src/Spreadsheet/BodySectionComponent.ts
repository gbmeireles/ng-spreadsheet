import { HostBinding, HostListener, Component, Input, ElementRef, EventEmitter, Inject } from '@angular/core';
import { OnInit, OnChanges, OnDestroy } from '@angular/core';
import {
    Cell,
    SpreadsheetSectionPositionInformationMap,
    CellLocation,
} from '../Model/Model';
import {
    CellGetter,
    CellLocationRelativeToViewportGetter,
} from '../Services/Services';
import {
    DISPATCHER_TOKEN,
    DISPATCHER_PROVIDERS,
    Action,
    UpdateColumnSizeAction,
    ScrollSpreadsheetSectionAction,
    ScrollSpreadsheetAction,
    GoToCellLocationAction,
} from '../Events/Events';
import { SpreadsheetState } from './SpreadsheetState';

const css = `
:host {
    display: block;
    position: absolute;
    height: 100%;
    outline: none;
    z-index: 0;
}

:host[spreadsheetSectionName="RowNumber"] {
    width: 20px;
}

:host[spreadsheetSectionName="Scroll"] {
    width: 20px;
    right: 0;
    overflow-y: scroll;
}

:host[spreadsheetSectionName="Scroll"] Row {
    visibility: hidden;
}

:host {
    overflow-x: scroll;
    overflow-y: hidden;
}
`;

@Component({
    selector: 'BodySection',
    styles: [css],
    template: '<ng-content></ng-content>',
})
export class BodySectionComponent implements OnDestroy, OnInit {
    @HostBinding('style.left') left: number;
    @HostBinding('style.width') width: number;
    @Input('spreadsheetSectionName') spreadsheetSectionName: string;
    @Input('spreadsheetSectionPositionInformationMap') spreadsheetSectionPositionInformationMap: SpreadsheetSectionPositionInformationMap;
    @Input('spreadsheetSectionScrollLeftMap') spreadsheetSectionScrollLeftMap: { [spreadsheetSectionName: string]: number };
    @Input('activeCellLocation') activeCellLocation: CellLocation;

    private isInitialized: boolean = false;
    private onWheelTimeoutId: number;
    private unregisterActiveCellPositionChangeSubscription: () => void;
    private _scrollTop: number;
    private _scrollLeft: number;

    constructor(private el: ElementRef,
        @Inject(DISPATCHER_TOKEN) private eventEmitter: EventEmitter<Action>,
        private cellGetter: CellGetter,
        private cellLocationRelativeToViewportGetter: CellLocationRelativeToViewportGetter,
        private spreadsheetState: SpreadsheetState) {
    }

    get scrollTop(): number {
        if (this._scrollTop == null) {
            this._scrollTop = this.bodyElement.scrollTop;
        }
        if (isNaN(this._scrollTop)) {
            this._scrollTop = 0;
        }
        return this._scrollTop;
    }
    @Input('scrollTop')
    set scrollTop(scrollTop: number) {
        if (scrollTop < 0 || isNaN(this._scrollTop)) {
            scrollTop = 0;
        }
        if (this._scrollTop !== scrollTop) {
            this.bodyElement.scrollTop = scrollTop;
        }
        this._scrollTop = scrollTop;
    }

    get scrollLeft(): number {
        if (this._scrollLeft == null) {
            this._scrollLeft = this.bodyElement.scrollLeft;
        }
        return this._scrollLeft;
    }
    set scrollLeft(scrollLeft: number) {
        if (scrollLeft < 0) {
            scrollLeft = 0;
        }
        this._scrollLeft = scrollLeft;
        if (this.bodyElement.scrollLeft !== scrollLeft) {
            this.bodyElement.scrollLeft = this._scrollLeft;
        }
    }

    private get bodyElement(): HTMLElement {
        return this.el.nativeElement;
    }

    focus() {
        this.el.nativeElement.focus();
    }

    ngOnInit() {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;
    }

    ngOnChanges(obj) {
        if (obj['spreadsheetSectionPositionInformationMap']) {
            var spreadsheetSectionPositionInformation =
                this.spreadsheetSectionPositionInformationMap && this.spreadsheetSectionPositionInformationMap[this.spreadsheetSectionName];
            if (spreadsheetSectionPositionInformation) {
                this.left = spreadsheetSectionPositionInformation.left;
                this.width = spreadsheetSectionPositionInformation.width;
            }
        }
        if (obj['spreadsheetSectionScrollLeftMap']) {
            this.el.nativeElement.scrollLeft = this.spreadsheetSectionScrollLeftMap
                && this.spreadsheetSectionScrollLeftMap[this.spreadsheetSectionName];
        }
        if (obj['spreadsheetSectionPositionInformationMap']) {
            this.updateSectionPosition(this.spreadsheetSectionPositionInformationMap);
        }
    }

    ngOnDestroy() {

    }

    updateSectionPosition(sectionPositionInformationMap: SpreadsheetSectionPositionInformationMap) {
        var sectionPositionInformation = sectionPositionInformationMap[this.spreadsheetSectionName];
        if (!sectionPositionInformation) {
            return;
        }
        this.left = sectionPositionInformation.left;
        this.width = sectionPositionInformation.width;
    }

    @HostListener('keydown', ['$event'])
    onKeyUp(evt: KeyboardEvent) {
        var scrollTop;
        var scrollLeft;
        var sourceActiveCell = this.cellGetter.get(this.activeCellLocation);
        var targetActiveCell: Cell;
        var keyCode = evt.keyCode;
        var rowspan = sourceActiveCell && sourceActiveCell.spreadsheetCell ? sourceActiveCell.spreadsheetCell.rowspan : 1;
        var colspan = sourceActiveCell && sourceActiveCell.spreadsheetCell ? sourceActiveCell.spreadsheetCell.colspan : 1;

        switch (evt.keyCode) {
            case 27://Esc
                if (sourceActiveCell) {
                    sourceActiveCell.cancelEdit();
                    this.bodyElement.focus();
                }
                break;
            case 33://Page Up
                scrollTop = Math.min(this.scrollTop - this.bodyElement.clientHeight, 0);
                evt.preventDefault();
                break;
            case 34://Page Down
                scrollTop = Math.min(this.scrollTop + this.bodyElement.clientHeight, this.bodyElement.scrollHeight);
                evt.preventDefault();
                break;
            case 35://End
                this.bodyElement.style.overflowY = 'scroll';
                scrollTop = this.bodyElement.scrollHeight;
                this.bodyElement.style.overflowY = 'hidden';
                evt.preventDefault();
                break;
            case 36://Home
                scrollTop = 0;
                evt.preventDefault();
                break;
            case 37: {//Arrow Left
                this.eventEmitter.emit(
                    new GoToCellLocationAction(this.activeCellLocation.rowIndex, this.activeCellLocation.columnIndex - colspan, true));
                break;
            }
            case 38://Arrow Up
                this.eventEmitter.emit(
                    new GoToCellLocationAction(this.activeCellLocation.rowIndex - rowspan, this.activeCellLocation.columnIndex, true));
                break;
            case 39: {//Arrow right
                this.eventEmitter.emit(
                    new GoToCellLocationAction(this.activeCellLocation.rowIndex, this.activeCellLocation.columnIndex + colspan, true));
                break;
            }
            case 9://Tab
                evt.preventDefault();
                var isEditing = (sourceActiveCell == null) ? false : sourceActiveCell.isEditing;
                if (evt.shiftKey) {
                    this.eventEmitter.emit(
                        new GoToCellLocationAction(this.activeCellLocation.rowIndex, this.activeCellLocation.columnIndex - colspan, true));
                } else {
                    this.eventEmitter.emit(
                        new GoToCellLocationAction(this.activeCellLocation.rowIndex, this.activeCellLocation.columnIndex + colspan, true));
                }

                setTimeout(() => {
                    targetActiveCell = this.cellGetter.get(this.activeCellLocation);
                    if (sourceActiveCell && isEditing) {
                        targetActiveCell.goToEditMode();
                    }
                });
                break;
            case 13://Enter
                targetActiveCell = this.cellGetter.get(this.activeCellLocation);
                if (targetActiveCell) {
                    targetActiveCell.confirmEdit();
                }
            case 40: {//Arrow Down
                this.eventEmitter.emit(
                    new GoToCellLocationAction(this.activeCellLocation.rowIndex + rowspan, this.activeCellLocation.columnIndex, true));
                break;
            }
            case 113://F2
                if (sourceActiveCell) {
                    sourceActiveCell.goToEditMode();
                }
                break;
            default:
                return;
        }
        evt.preventDefault();

        if (scrollTop !== undefined) {
            this.eventEmitter.emit(new ScrollSpreadsheetAction(scrollTop));
        }
        if (scrollLeft !== undefined) {
            this.eventEmitter.emit(new ScrollSpreadsheetSectionAction(this.spreadsheetSectionName, scrollLeft));
        }
    }

    @HostListener('wheel', ['$event'])
    onWheel(evt: WheelEvent) {
        var scrollTop = Math.min(this.scrollTop + evt.deltaY, this.bodyElement.scrollHeight);
        this.eventEmitter.emit(new ScrollSpreadsheetAction(scrollTop));
    }

    @HostListener('scroll', ['$event'])
    onScroll() {
        var scrollLeft = this.bodyElement.scrollLeft;
        if (this.scrollLeft !== scrollLeft) {
            this.scrollLeft = scrollLeft;
            this.eventEmitter.emit(new ScrollSpreadsheetSectionAction(this.spreadsheetSectionName, scrollLeft));
        };
        if (this.spreadsheetSectionName === 'Scroll') {
            var scrollTop = this.bodyElement.scrollTop;
            this.eventEmitter.emit(new ScrollSpreadsheetAction(scrollTop));
        } else if (this.scrollTop !== this.bodyElement.scrollTop) {
            this.bodyElement.scrollTop = this.scrollTop;
        }
    }
}