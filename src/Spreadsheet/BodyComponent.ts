import { Component, OnChanges, OnInit, ElementRef, HostListener, Input, ViewChild, SimpleChange } from '@angular/core';
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
<GgBodySection #rowNumberSection gridSectionName="RowNumber">
    <GgNumberRowList [numberRowList]="numberDataRowList" [rowHeight]="rowHeight"></GgNumberRowList>
</GgBodySection>
<GgBodySection *ngFor="let gridSection of gridSectionList; trackBy:gridSectionIdentity" [gridSectionName]="gridSection.name"
    tabindex="0">
    <GgRowList [rowList]="gridSection.visibleDataRowList" [gridSectionName]="gridSection.name"></GgRowList>
    <div [style.height.px]="gridSectionList[0]?.dataRowListLength * rowHeight" style="position: absolute; width:2px; top:0;"></div>
</GgBodySection>
<GgBodySection gridSectionName="Scroll">
    <div [style.height.px]="gridSectionList[0]?.dataRowListLength * rowHeight"></div>
</GgBodySection>`;

@Component({
    selector: 'GgBody',
    template: html,
    styles: [css],
    directives: [BodySectionComponent, NumberRowListComponent, RowListComponent],
})
export class BodyComponent implements OnInit {
    @Input('gridSectionList') gridSectionList: GridSection[] = [];
    @Input('numberDataRowList') numberDataRowList: GridRow[] = [];
    @ViewChild(BodySectionComponent) rowNumberSection: BodySectionComponent;
    rowHeight: number;
    private isInitialized: boolean;

    constructor(private el: ElementRef,
        private bodyWidthManager: BodyWidthManager,
        private bodyScrollManager: BodyScrollManager,
        private bodyHeightManager: BodyHeightManager,
        private rowHeightManager: RowHeightManager) {
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

        this.bodyWidthManager.set(this.el.nativeElement.clientWidth);
        this.bodyHeightManager.set(this.el.nativeElement.clientHeight);
    }

    updateScrollTop() {
        if (this.rowNumberSection) {
            this.rowNumberSection.updateScrollTop();
            this.bodyScrollManager.set(this.rowNumberSection.scrollTop);
        }
    }

    gridSectionIdentity(index: number, gridSection: GridSection): any {
        if (gridSection) {
            return gridSection.name;
        }
        return 'gridSection_' + index;
    }

    @HostListener('scroll')
    onScroll() {
        this.bodyScrollManager.set(this.el.nativeElement.scrollTop);
    }
}