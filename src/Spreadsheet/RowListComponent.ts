import { Component, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { OnChanges, SimpleChange } from '@angular/core';
import { RowComponent } from './RowComponent';
import { CellComponent } from './Cell/Cell';
import {
    GridRow,
    GridCell,
    ColumnPositionInformationMap,
    CellLocation,
} from '../Model/Model';

const html = `
<Row *ngFor="let row of rowList; trackBy:rowIndentity; let i = index" 
    [row]="row" [gridSectionName]="gridSectionName" [index]="i"
    [scrollWidth]="gridSectionScrollWidth"
    [activeCellLocation]="activeCellLocation">
    <Cell *ngFor="let cell of row?.visibleCellList; let cellIndex = index; trackBy:cellIdentity"
        [cell]="cell" 
        [index]="cellIndex" 
        [rowData]="row?.rowData" 
        [columnPositionInformationMap]="columnPositionInformationMap"
        [gridSectionScrollLeft]="gridSectionScrollLeft"
        [activeCellLocation]="activeCellLocation"
        >
    </Cell>
</Row>`;

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    directives: [RowComponent, CellComponent],
    selector: `RowList`,
    template: html,
    styles: [`
    :host() {
        display:block;
        min-height: 20px; 
    }`],
})
export class RowListComponent {
    @Input('rowList') rowList: GridRow[];
    @Input('gridSectionName') gridSectionName: string;
    @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
    @Input('gridSectionScrollWidthMap') gridSectionScrollWidthMap: { [gridSectionName: string]: number };
    @Input('gridSectionScrollLeftMap') gridSectionScrollLeftMap: { [gridSectionName: string]: number };
    @Input('activeCellLocation') activeCellLocation: CellLocation;
    @HostBinding('style.minWidth') gridSectionScrollWidth: number;
    gridSectionScrollLeft: number;

    constructor(private cdr: ChangeDetectorRef) {

    }

    ngOnChanges(obj) {
        if (obj['gridSectionScrollWidthMap']) {
            this.gridSectionScrollWidth = this.gridSectionScrollWidthMap ? this.gridSectionScrollWidthMap[this.gridSectionName] : 0;
        }
        if (obj['gridSectionScrollLeftMap']) {
            this.gridSectionScrollLeft = this.gridSectionScrollLeftMap ? this.gridSectionScrollLeftMap[this.gridSectionName] : 0;
        }
    }

    rowIndentity(index: number, row: GridRow): any {
        return index;
    }

    cellIdentity(index: number, cell: GridCell): any {
        return index;
    }
}