import { HostBinding, HostListener, Component, Input, ElementRef, EventEmitter, Inject } from '@angular/core';
import { OnInit, OnChanges, OnDestroy } from '@angular/core';
import {
    SectionPositionInformationMapManager,
    BodyScrollManager,
    BodySectionScrollManager,
    CellNavigator,
    RowHeightManager,
    ActiveCellGetter,
    GridSectionListManager,
    ActiveCellManager,
    ColumnPositionInformationMapManager,
} from '../Services/Services';
import { Cell, SectionPositionInformationMap } from '../Model/Model';
import {
    EVENT_EMITTER_TOKEN,
    EVENT_PROVIDERS,
    Event,
    ColumnMovedEvent,
    ColumnResizedEvent,
    SectionHorizontallyScrolledEvent,
    SpreadsheetVerticallyScrolledEvent,
} from '../Events/Events';

const css = `
:host {
    display: block;
    position: absolute;
    height: 100%;
    outline: none;
}

:host[gridSectionName="RowNumber"] {
    width: 20px;
}

:host[gridSectionName="Scroll"] {
    width: 20px;
    right: 0;
    overflow-y: scroll;
}

:host[gridSectionName="Scroll"] GgRow {
    visibility: hidden;
}

:host {
    overflow-x: scroll;
    overflow-y: hidden;
}
`;

@Component({
    selector: 'GgBodySection',
    styles: [css],
    template: '<ng-content></ng-content>',
})
export class BodySectionComponent implements OnDestroy, OnInit {
    @HostBinding('style.left') left: number;
    @HostBinding('style.width') width: number;
    @Input('gridSectionName') gridSectionName: string;

    private isInitialized: boolean = false;
    private sectionPositionInformatonMapUnsubscriber: () => void;
    private unregisterActiveCellPositionChangeSubscription: () => void;
    private _scrollTop: number;
    private _scrollLeft: number;

    constructor(private el: ElementRef,
        private bodyScrollManager: BodyScrollManager,
        private bodySectionScrollManager: BodySectionScrollManager,
        private sectionPositionInformationMapManager: SectionPositionInformationMapManager,
        private cellNavigationManager: CellNavigator,
        private rowHeightManager: RowHeightManager,
        private activeCellGetter: ActiveCellGetter,
        private gridSectionListManager: GridSectionListManager,
        private activeCellManager: ActiveCellManager,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager,
        @Inject(EVENT_EMITTER_TOKEN) private eventEmitter: EventEmitter<Event>) {
        this.sectionPositionInformatonMapUnsubscriber =
            this.sectionPositionInformationMapManager.subscribe((sectionPositionInformationMap: SectionPositionInformationMap) => {
                this.updateSectionPosition(sectionPositionInformationMap);
            });

        this.unregisterActiveCellPositionChangeSubscription = this.activeCellManager.subscribe((gridCell) => {
            var gridSection = gridSectionListManager.get().find(gc => gc.name === this.gridSectionName);
            if (!gridSection) {
                return;
            }
            var visibleGridRow = gridSection.visibleDataRowList.find(row => row.rowIndex === gridCell.rowIndex);
            if (!visibleGridRow) {
                return;
            }
            var visibleGridCell = visibleGridRow.cellList.find(cell => cell.columnIndex === gridCell.columnIndex);
            if (visibleGridCell) {
                this.bodyElement.focus();
                var visibleGridCellPosition = this.columnPositionInformationMapManager.get()[visibleGridCell.columnIndex];
                if (this.bodyElement.scrollLeft > visibleGridCellPosition.left) {
                    this.bodyElement.scrollLeft = visibleGridCellPosition.left;
                }
            }
        });
    }

    updateScrollTop(): void {
        this._scrollTop = this.bodyElement.scrollTop;
    }

    get scrollTop(): number {
        if (this._scrollTop == undefined) {
            this._scrollTop = this.bodyElement.scrollTop;
        }
        return this._scrollTop;
    }
    @Input('scrollTop')
    set scrollTop(scrollTop: number) {
        if (scrollTop < 0) {
            scrollTop = 0;
        }
        this._scrollTop = scrollTop;
        if (this.bodyElement.scrollTop !== scrollTop) {
            this.bodyElement.scrollTop = this._scrollTop;
        }
    }

    get scrollLeft(): number {
        if (this._scrollLeft == undefined) {
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

    updateSectionPosition(sectionPositionInformationMap: SectionPositionInformationMap) {
        var sectionPositionInformation = sectionPositionInformationMap[this.gridSectionName];
        if (!sectionPositionInformation) {
            return;
        }
        this.left = sectionPositionInformation.left;
        this.width = sectionPositionInformation.width;
    }

    ngOnInit() {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;
        this.updateSectionPosition(this.sectionPositionInformationMapManager.get());
    }

    ngOnDestroy() {
        this.sectionPositionInformatonMapUnsubscriber();
        this.unregisterActiveCellPositionChangeSubscription();
    }

    @HostListener('keydown', ['$event'])
    onKeyUp(evt: KeyboardEvent) {
        var scrollTop;
        var scrollLeft;
        var sourceActiveCell = this.activeCellGetter.get();
        var targetActiveCell: Cell;
        switch (evt.keyCode) {
            case 27://Esc
                sourceActiveCell.cancelEdit();
                this.bodyElement.focus();
                break;
            case 33://Page Up
                scrollTop = this.scrollTop - this.bodyElement.clientHeight;
                evt.preventDefault();
                break;
            case 34://Page Down
                scrollTop = this.scrollTop + this.bodyElement.clientHeight;
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
            case 37://Arrow Left
                if (!this.cellNavigationManager.goLeft()) {
                    evt.preventDefault();
                    return;
                }
                targetActiveCell = this.activeCellGetter.get();
                if (sourceActiveCell && sourceActiveCell.sectionColumnIndex === 0) {
                    break;
                }
                scrollLeft = targetActiveCell.left;
                break;
            case 38://Arrow Up
                if (!this.cellNavigationManager.goUp()) {
                    return;
                }
                scrollTop = this.scrollTop - this.rowHeightManager.get();
                break;
            case 39://Arrow Right
                if (!this.cellNavigationManager.goRight()) {
                    evt.preventDefault();
                    return;
                }
                targetActiveCell = this.activeCellGetter.get();
                scrollLeft = this.scrollLeft + sourceActiveCell.width;
                break;
            case 9://Tab
                evt.preventDefault();
                var isEditing = (sourceActiveCell == null) ? false : sourceActiveCell.isEditing;
                if (evt.shiftKey) {
                    if (this.cellNavigationManager.goLeft()) {
                        scrollLeft = targetActiveCell.left;
                    }
                } else {
                    if (this.cellNavigationManager.goRight()) {
                        scrollLeft = this.scrollLeft + sourceActiveCell.width;
                    }
                }

                setTimeout(() => {
                    targetActiveCell = this.activeCellGetter.get();
                    if (targetActiveCell && isEditing) {
                        targetActiveCell.goToEditMode();
                    }
                });
                break;
            case 13://Enter
            case 40://Arrow Down
                if (!this.cellNavigationManager.goDown()) {
                    return;
                }
                scrollTop = this.scrollTop + this.rowHeightManager.get();
                break;
            case 113://F2
                var activeCell = this.activeCellGetter.get();
                if (activeCell) {
                    activeCell.goToEditMode();
                }
                break;
            default:
                return;
        }
        evt.preventDefault();

        if (scrollTop !== undefined) {
            this.bodyScrollManager.set(scrollTop);
            this.eventEmitter.emit(new SpreadsheetVerticallyScrolledEvent(scrollTop));
        }
        if (scrollLeft !== undefined) {
            this.scrollLeft = scrollLeft;
            this.bodySectionScrollManager.set(this.gridSectionName, scrollLeft);
            this.eventEmitter.emit(new SectionHorizontallyScrolledEvent(this.gridSectionName, scrollLeft));
        }
    }

    @HostListener('wheel', ['$event'])
    onWheel(evt: WheelEvent) {
        var scrollTop = Math.min(this.scrollTop + evt.deltaY, this.bodyElement.scrollHeight);
        this.bodyScrollManager.set(scrollTop);
        this.eventEmitter.emit(new SpreadsheetVerticallyScrolledEvent(scrollTop));
    }

    @HostListener('scroll', ['$event'])
    onScroll() {
        var scrollLeft = this.bodyElement.scrollLeft;
        if (this.scrollLeft !== scrollLeft) {
            this.scrollLeft = scrollLeft;
            this.eventEmitter.emit(new SectionHorizontallyScrolledEvent(this.gridSectionName, scrollLeft));
        };
        this.bodySectionScrollManager.set(this.gridSectionName, this.bodyElement.scrollLeft);
        if (this.gridSectionName === 'Scroll') {
            var scrollTop = this.bodyElement.scrollTop;
            this.bodyScrollManager.set(scrollTop);
            this.eventEmitter.emit(new SpreadsheetVerticallyScrolledEvent(scrollTop));
        }
    }
}