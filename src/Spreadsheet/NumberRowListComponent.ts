import { Component, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpreadsheetRow } from '../Model/SpreadsheetRow';

const css = `
div.handler {
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
<Row *ngFor="let numberRow of numberRowList; trackBy:rowIndentity; let i = index" [row]="numberRow" spreadsheetSectionName="RowNumber"
    [index]="i">
    <div class="handler" [style.lineHeight.px]="rowHeight">{{numberRow.rowNumber}}</div>
</Row>`;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: `NumberRowList`,
    template: html,
    styles: [css],
})
export class NumberRowListComponent {
    @Input('numberRowList') numberRowList: SpreadsheetRow[];
    @Input('rowHeight') rowHeight: number;

    rowIndentity(index: number, row: SpreadsheetRow): any {
        return index;
    }
}