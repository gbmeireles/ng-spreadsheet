import { Component, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { OnChanges, SimpleChange } from '@angular/core';
import { RowComponent } from '../Row/RowComponent';
import { CellComponent } from './Cell/CellComponent';
import {
    RowViewportVisibleRowCountGetter,
    BodySectionScrollManager,
} from '../../Services/Services';
import { GridRow } from '../../Model/GridRow';
import { GridCell } from '../../Model/GridCell';

const html = `
<GgRow *ngFor="let row of rowList; trackBy:rowIndentity; let i = index" [row]="row" [gridSectionName]="gridSectionName" [index]="i">
    <GgCell [cell]="cell" [index]="cellIndex" [rowData]="row?.rowData" 
        *ngFor="let cell of row?.visibleCellList; let cellIndex = index; trackBy:cellIdentity">
    </GgCell>
</GgRow>`;

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    directives: [RowComponent, CellComponent],
    selector: `GgRowList`,
    template: html,
})
export class RowListComponent {
    @Input('rowList') rowList: GridRow[];
    @Input('gridSectionName') gridSectionName: string;

    constructor(private rowViewportVisibleRowCountGetter: RowViewportVisibleRowCountGetter,
        private bodySectionScrollManager: BodySectionScrollManager,
        private cdr: ChangeDetectorRef) {
        this.bodySectionScrollManager.subscribe((param) => {
            if (param.gridSectionName === this.gridSectionName) {
                this.cdr.markForCheck();
            }
        });
    }

    rowIndentity(index: number, row: GridRow): any {
        return index;
    }

    cellIdentity(index: number, cell: GridCell): any {
        return index;
    }
}