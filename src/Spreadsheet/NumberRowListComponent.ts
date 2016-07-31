import { Component, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RowComponent } from './RowComponent';
import { GridRow } from '../Model/GridRow';

const css = `
GgRowHandlerCell {
    display: inline-block;
    position: absolute;
    width: 20px;
    background-color: #E6E6E6;
    height: 100%;
    border-bottom: 1px inset #A3A3A3;
    font-size: 10px;
    text-align: center;
    font-weight: bold;
}`;

const html = `
<GgRow *ngFor="let numberRow of numberRowList; trackBy:rowIndentity; let i = index" [row]="numberRow" gridSectionName="RowNumber"
    [index]="i">
    <GgRowHandlerCell [style.lineHeight.px]="rowHeight">{{numberRow.rowNumber}}</GgRowHandlerCell>
</GgRow>`;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [RowComponent],
    selector: `GgNumberRowList`,
    template: html,
    styles: [css],
})
export class NumberRowListComponent {
    @Input('numberRowList') numberRowList: GridRow[];
    @Input('rowHeight') rowHeight: number;

    rowIndentity(index: number, row: GridRow): any {
        return index;
    }
}