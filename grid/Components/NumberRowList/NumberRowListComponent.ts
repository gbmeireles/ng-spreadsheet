import { Component, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RowComponent } from '../RowList/Row/RowComponent';
import { GridRow } from '../../Model/GridRow';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [RowComponent],
    selector: `GgNumberRowList`,
    template: `
    <GgRow *ngFor="let numberRow of numberRowList; trackBy:rowIndentity; let i = index" [row]="numberRow" gridSectionName="RowNumber" [index]="i">
        <GgRowHandlerCell [style.lineHeight.px]="rowHeight">{{numberRow.rowNumber}}</GgRowHandlerCell>
    </GgRow>
    `,
})
export class NumberRowListComponent {
    @Input('numberRowList') numberRowList: GridRow[];
    @Input('rowHeight') rowHeight: number;

    rowIndentity(index: number, row: GridRow): any {
        return index;
    }
}