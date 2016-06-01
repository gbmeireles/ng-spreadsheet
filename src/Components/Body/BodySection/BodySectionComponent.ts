import { HostBinding, HostListener, Component, Input, ElementRef } from '@angular/core';
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
} from '../../../Services/Services';
import { Cell } from '../../../Model/Model';

@Component({
    moduleId: __moduleName,
    selector: 'GgBodySection',
    styleUrls: ['BodySection.css'],
    template: '<ng-content></ng-content>',
})
export class BodySectionComponent implements OnDestroy, OnInit {
    @HostBinding('style.left') left: number;
    @HostBinding('style.width') width: number;
    @Input('gridSectionName') gridSectionName: string;

    private isInitialized: boolean = false;
    private bodyScrollUnsubscriber: () => void;
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
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager) {
        this.sectionPositionInformatonMapUnsubscriber =
            this.sectionPositionInformationMapManager.subscribe((sectionPositionInformationMap: SectionPositionInformationMap) => {
                this.updateSectionPosition(sectionPositionInformationMap);
            });

        this.bodyScrollUnsubscriber = this.bodyScrollManager.subscribe((scrollTop) => {
            this.scrollTop = scrollTop;
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
                this.el.nativeElement.focus();
                var visibleGridCellPosition = this.columnPositionInformationMapManager.get()[visibleGridCell.columnIndex];
                if (this.el.nativeElement.scrollLeft > visibleGridCellPosition.left) {
                    this.el.nativeElement.scrollLeft = visibleGridCellPosition.left;
                }
            }
        });
    }

    updateScrollTop() {
        this._scrollTop = this.el.nativeElement.scrollTop;
        return this._scrollTop;
    }

    get scrollTop() {
        if (this._scrollTop == undefined) {
            this._scrollTop = this.el.nativeElement.scrollTop;
        }
        return this._scrollTop;
    }
    set scrollTop(scrollTop) {
        if (scrollTop < 0) {
            scrollTop = 0;
        }
        this._scrollTop = scrollTop;
        this.el.nativeElement.scrollTop = this._scrollTop;
    }

    get scrollLeft() {
        if (this._scrollLeft == undefined) {
            this._scrollLeft = this.el.nativeElement.scrollLeft;
        }
        return this._scrollLeft;
    }
    set scrollLeft(scrollLeft) {
        if (scrollLeft < 0) {
            scrollLeft = 0;
        }
        this._scrollLeft = scrollLeft;
        this.el.nativeElement.scrollLeft = this._scrollLeft;
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
        this.bodyScrollUnsubscriber();
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
                this.el.nativeElement.focus();
                break;
            case 33://Page Up
                scrollTop = this.scrollTop - this.el.nativeElement.clientHeight;
                evt.preventDefault();
                break;
            case 34://Page Down
                scrollTop = this.scrollTop + this.el.nativeElement.clientHeight;
                evt.preventDefault();
                break;
            case 35://End
                this.el.nativeElement.style.overflowY = 'scroll';
                scrollTop = this.el.nativeElement.scrollHeight;
                this.el.nativeElement.style.overflowY = 'hidden';
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
        }
        if (scrollLeft !== undefined) {
            this.scrollLeft = scrollLeft;
            this.bodySectionScrollManager.set(this.gridSectionName, scrollLeft);
        }
    }

    @HostListener('wheel', ['$event'])
    onWheel(evt: WheelEvent) {
        var scrollTop = Math.min(this.scrollTop + evt.deltaY, this.el.nativeElement.scrollHeight);
        this.bodyScrollManager.set(scrollTop);
    }

    @HostListener('scroll', ['$event'])
    onScroll() {
        this.bodySectionScrollManager.set(this.gridSectionName, this.el.nativeElement.scrollLeft);
        if (this.gridSectionName === 'Scroll') {
            this.bodyScrollManager.set(this.el.nativeElement.scrollTop);
        }
    }
}