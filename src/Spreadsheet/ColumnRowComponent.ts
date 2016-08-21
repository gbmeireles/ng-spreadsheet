import { HostBinding, Component, Input, ElementRef, ViewChildren, Renderer } from '@angular/core';
import { OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CORE_DIRECTIVES, NgFor } from '@angular/common';
import {
    Column,
    GridColumn,
    ColumnPositionInformationMap,
} from '../Model/Model';
import {
    ColumnIdentifierMapGetter,
} from '../Services/Services';

const columnUnitList: string[] =
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const css = `
:host {
    display: block;
    position: relative;
    height: 20px;
}`;

const html = `
<ColumnCell *ngFor="let gridColumn of visibleGridColumnList; let columnIndex = index; trackBy:cellIndentity;" 
    [gridColumn]="gridColumn"
    [columnList]="columnList"
    [index]="columnIndex" 
    [columnIdentifier]="gridColumnIdentifierMap[gridColumn.index]"
    [columnPositionInformationMap]="columnPositionInformationMap">
</ColumnCell>`;

@Component({
    selector: 'ColumnRow',
    template: html,
    styles: [css],
})
export class ColumnRowComponent implements OnInit, OnDestroy, OnChanges {
    @Input('gridSectionName') gridSectionName: string;
    @HostBinding('style.height') height: number;
    @Input('visibleGridColumnList') visibleGridColumnList: GridColumn[];
    @Input('gridColumnList') gridColumnList: GridColumn[];
    @Input('columnList') columnList: Column[];
    @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;

    @Input('scrollWidth')
    @HostBinding('style.minWidth')
    scrollWidth: number;

    gridColumnIdentifierMap: { [columnIndex: number]: string } = {};

    constructor(private el: ElementRef,
        private renderer: Renderer,
        private columnIdentifierMapGetter:ColumnIdentifierMapGetter) {
    }

    cellIndentity(index: number, cell): any {
        return index;
    }

    updateColumnIdentifierList() {
        this.gridColumnIdentifierMap = this.columnIdentifierMapGetter.getMap(this.gridColumnList);
    }

    ngOnInit() {
        this.updateColumnIdentifierList();
    }

    ngOnChanges(obj) {
        if (obj['gridColumnList'] || obj['visibleGridColumnList']) {
            this.updateColumnIdentifierList();
        }
    }

    ngOnDestroy() {
    }
}