import { HostBinding, HostListener, Component, Input, ElementRef, OnDestroy } from '@angular/core';

import { NumberRowListComponent } from './NumberRowListComponent';
import { HeaderSectionComponent } from './HeaderSectionComponent';
import { RowListComponent } from './RowListComponent';
import {
    GridSection,
    Column,
    GridRow,
    ColumnPositionInformationMap,
    GridSectionPositionInformationMap,
    GridColumn,
} from '../Model/Model';

const html = `
<HeaderSection gridSectionName="RowNumber" 
    [columnList]="columnList"
    [gridColumnList]="gridColumnList">
    <NumberRowList [numberRowList]="numberTitleRowList" [rowHeight]="rowHeight"></NumberRowList>
</HeaderSection>
<HeaderSection *ngFor="let gridSection of gridSectionList; trackBy:gridSectionIdentity"
    [gridSectionScrollWidthMap]="gridSectionScrollWidthMap"
    [gridSectionName]="gridSection.name"
    [gridSectionPositionInformationMap]="gridSectionPositionInformationMap" 
    [columnList]="columnList"
    [gridColumnList]="gridColumnList"
    [gridSectionScrollLeftMap]="gridSectionScrollLeftMap"
    [gridSectionColumnToRendexIndexListMap]="gridSectionColumnToRendexIndexListMap"
    [columnPositionInformationMap]="columnPositionInformationMap"
    [class.is-separating-section]="gridSection !== gridSectionList[gridSectionList.length - 1]">
    <RowList [rowList]="gridSection.titleRowList" 
        [gridSectionName]="gridSection.name"
        [columnPositionInformationMap]="columnPositionInformationMap"
        [gridSectionScrollWidthMap]="gridSectionScrollWidthMap"
        [gridSectionScrollLeftMap]="gridSectionScrollLeftMap"></RowList>
</HeaderSection>
<HeaderSection gridSectionName="Scroll" [columnList]="columnList">
</HeaderSection>`;

const css = `
:host {
    display: block;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
}`;

const NUMBER_ROW_HEIGHT: number = 20;

@Component({
    selector: 'Header',
    template: html,
    styles: [css],
    directives: [NumberRowListComponent, HeaderSectionComponent, RowListComponent],
})
export class HeaderComponent implements OnDestroy {
    @HostBinding('style.height') height: number;
    @Input('numberTitleRowList') numberTitleRowList: GridRow[];
    @Input('gridSectionList') gridSectionList: GridSection[];
    @Input('gridColumnList') gridColumnList: GridColumn[];
    @Input('columnList') columnList: Column[];
    @Input('rowHeight') rowHeight: number;
    @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
    @Input('gridSectionScrollWidthMap') gridSectionScrollWidthMap: { [gridSectionName: string]: number };
    @Input('gridSectionScrollLeftMap') gridSectionScrollLeftMap: { [gridSectionName: string]: number };
    @Input('gridSectionPositionInformationMap') gridSectionPositionInformationMap: GridSectionPositionInformationMap;
    @Input('gridSectionColumnToRendexIndexListMap') gridSectionColumnToRendexIndexListMap: { [gridSectionName: string]: number[] };

    constructor() {
    }

    ngOnChanges(obj) {
        if (obj['numberTitleRowList'] || obj['rowHeight']) {
            this.updateHeight();
        }
    }

    ngOnDestroy() {
    }

    gridSectionIdentity(index: number, gridSection: GridSection): any {
        if (gridSection) {
            return gridSection.name;
        }
        return 'gridSection_' + index;
    }

    private updateHeight() {
        this.height = this.numberTitleRowList.length * this.rowHeight + NUMBER_ROW_HEIGHT;
    }
}