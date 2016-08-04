import { HostBinding, HostListener, Component, Input, ElementRef, OnDestroy } from '@angular/core';

import {
    RowHeightManager,
} from '../Services/Services';
import { NumberRowListComponent } from './NumberRowListComponent';
import { HeaderSectionComponent } from './HeaderSectionComponent';
import { RowListComponent } from './RowListComponent';
import {
    GridSection,
    Column,
    GridRow,
} from '../Model/Model';

const html = `
<GgHeaderSection gridSectionName="RowNumber" [columnList]="columnList">
    <GgNumberRowList [numberRowList]="numberTitleRowList" [rowHeight]="rowHeight"></GgNumberRowList>
</GgHeaderSection>
<GgHeaderSection *ngFor="let gridSection of gridSectionList; trackBy:gridSectionIdentity" 
    [gridSectionName]="gridSection.name" [columnList]="columnList">
    <GgRowList [rowList]="gridSection.titleRowList" [gridSectionName]="gridSection.name"></GgRowList>
</GgHeaderSection>
<GgHeaderSection gridSectionName="Scroll" [columnList]="columnList">
</GgHeaderSection>`;

const css = `
:host {
    display: block;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
}`;

const NUMBER_ROW_HEIGHT: number = 20;

@Component({
    selector: 'GgHeader',
    template: html,
    styles: [css],
    directives: [NumberRowListComponent, HeaderSectionComponent, RowListComponent],
})
export class HeaderComponent implements OnDestroy {
    @HostBinding('style.height') height: number;
    @Input('rowCount') rowCount: number;
    @Input('numberTitleRowList') numberTitleRowList: GridRow[];
    @Input('gridSectionList') gridSectionList: GridSection[];
    @Input('columnList') columnList: Column[];

    private unsubscribeToRowHeightManagerChanges: () => void;

    constructor(private rowHeightManager: RowHeightManager) {
        this.unsubscribeToRowHeightManagerChanges =
            this.rowHeightManager.subscribe(rowHeight => this.updateHeight());
    }

    ngOnChanges() {
        this.updateHeight();
    }

    ngOnDestroy() {
        this.unsubscribeToRowHeightManagerChanges();
    }

    gridSectionIdentity(index: number, gridSection: GridSection): any {
        if (gridSection) {
            return gridSection.name;
        }
        return 'gridSection_' + index;
    }

    private updateHeight() {
        this.height = this.rowCount * this.rowHeightManager.get() + NUMBER_ROW_HEIGHT;
    }
}