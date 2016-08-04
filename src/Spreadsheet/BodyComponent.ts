import { Component, OnChanges, OnInit, OnDestroy, ElementRef, HostListener, Renderer, Input, ViewChild, SimpleChange } from '@angular/core';
import {
    BodyWidthManager,
    BodyScrollManager,
    BodyHeightManager,
    RowHeightManager,
    CellNavigator,
} from '../Services/Services';
import { GridSection } from '../Model/GridSection';
import { GridRow } from '../Model/GridRow';
import { BodySectionComponent } from './BodySectionComponent';
import { NumberRowListComponent } from './NumberRowListComponent';
import { RowListComponent } from './RowListComponent';

const css = `
:host {
    position: relative;
    height: 400px;
    max-height: 400px;
    overflow-y: hidden;
    display: block;
}`;

const html = `
<GgBodySection #rowNumberSection gridSectionName="RowNumber" [scrollTop]="scrollTop">
    <GgNumberRowList [numberRowList]="numberDataRowList" [rowHeight]="rowHeight"></GgNumberRowList>
    <div [style.height.px]="gridSectionList[0]?.dataRowListLength * rowHeight" style="position: absolute; width:2px; top:0;"></div>
</GgBodySection>
<GgBodySection *ngFor="let gridSection of gridSectionList; trackBy:gridSectionIdentity" [gridSectionName]="gridSection.name"
    tabindex="0" [scrollTop]="scrollTop">
    <GgRowList [rowList]="gridSection.visibleDataRowList" [gridSectionName]="gridSection.name"></GgRowList>
    <div [style.height.px]="gridSectionList[0]?.dataRowListLength * rowHeight" style="position: absolute; width:2px; top:0;"></div>
</GgBodySection>
<GgBodySection gridSectionName="Scroll" [scrollTop]="scrollTop">
    <div [style.height.px]="gridSectionList[0]?.dataRowListLength * rowHeight"></div>
</GgBodySection>`;

@Component({
    selector: 'GgBody',
    template: html,
    styles: [css],
    directives: [BodySectionComponent, NumberRowListComponent, RowListComponent],
})
export class BodyComponent implements OnInit, OnDestroy {
    @Input('scrollTop') scrollTop: number;
    @Input('gridSectionList') gridSectionList: GridSection[] = [];
    @Input('numberDataRowList') numberDataRowList: GridRow[] = [];
    rowHeight: number;
    private isInitialized: boolean;
    private unregisterResizeListener: Function;

    constructor(private el: ElementRef,
        private bodyWidthManager: BodyWidthManager,
        private bodyScrollManager: BodyScrollManager,
        private bodyHeightManager: BodyHeightManager,
        private rowHeightManager: RowHeightManager,
        private renderer: Renderer) {
        this.rowHeight = this.rowHeightManager.get();
        this.rowHeightManager.subscribe((rowHeight) => {
            this.rowHeight = rowHeight;
        });
    }

    ngOnInit() {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;

        this.updateSizeData();

        this.unregisterResizeListener = this.renderer.listenGlobal('window', 'resize', () => {
            this.updateSizeData();
        });
    }

    ngOnDestroy() {
        this.unregisterResizeListener();
    }

    gridSectionIdentity(index: number, gridSection: GridSection): any {
        if (gridSection) {
            return gridSection.name;
        }
        return 'gridSection_' + index;
    }

    private updateSizeData() {
        this.bodyWidthManager.set(this.el.nativeElement.clientWidth);
        this.bodyHeightManager.set(this.el.nativeElement.clientHeight);
    }
}