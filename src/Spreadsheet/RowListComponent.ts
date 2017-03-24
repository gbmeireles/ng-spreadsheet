import { Component, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { OnChanges, SimpleChange } from '@angular/core';
import {
    SpreadsheetRow,
    SpreadsheetCell,
    ColumnPositionInformationMap,
    CellLocation,
} from '../Model/Model';

const html = `
<Row *ngFor="let row of rowList; trackBy:rowIndentity; let rowIndex = index" 
    [row]="row" [spreadsheetSectionName]="spreadsheetSectionName" [index]="rowIndex"
    [scrollWidth]="spreadsheetSectionScrollWidth"
    [activeCellLocation]="activeCellLocation"
    [activeRowIndexList]="activeRowIndexList">
    <Cell *ngFor="let cell of row?.visibleCellList; let cellIndex = index; trackBy:cellIdentity"
        [cell]="cell" 
        [index]="cellIndex" 
        [rowData]="row?.rowData" 
        [columnPositionInformationMap]="columnPositionInformationMap"
        [spreadsheetSectionScrollLeft]="spreadsheetSectionScrollLeft"
        [activeCellLocation]="activeCellLocation"
        [rowHeight]="rowHeight"
        >
    </Cell>
</Row>`;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: `RowList`,
    template: html,
    styles: [`
    :host() {
        display:block;
        min-height: 20px;
    }`],
})
export class RowListComponent {
    @Input('rowList') rowList: SpreadsheetRow[];
    @Input('rowHeight') rowHeight: number;
    @Input('spreadsheetSectionName') spreadsheetSectionName: string;
    @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
    @Input('spreadsheetSectionScrollWidthMap') spreadsheetSectionScrollWidthMap: { [spreadsheetSectionName: string]: number };
    @Input('spreadsheetSectionScrollLeftMap') spreadsheetSectionScrollLeftMap: { [spreadsheetSectionName: string]: number };
    @Input('activeCellLocation') activeCellLocation: CellLocation;
    @Input('activeRowIndexList') activeRowIndexList: number[];
    @HostBinding('style.minWidth') spreadsheetSectionScrollWidth: number;
    spreadsheetSectionScrollLeft: number;

    constructor(private cdr: ChangeDetectorRef) {

    }

    ngOnChanges(obj) {
        if (obj['spreadsheetSectionScrollWidthMap']) {
            this.spreadsheetSectionScrollWidth =
                this.spreadsheetSectionScrollWidthMap ? this.spreadsheetSectionScrollWidthMap[this.spreadsheetSectionName] : 0;
        }
        if (obj['spreadsheetSectionScrollLeftMap']) {
            this.spreadsheetSectionScrollLeft =
                this.spreadsheetSectionScrollLeftMap ? this.spreadsheetSectionScrollLeftMap[this.spreadsheetSectionName] : 0;
        }
    }

    rowIndentity(index: number, row: SpreadsheetRow): any {
        return index;
    }

    cellIdentity(index: number, cell: SpreadsheetCell): any {
        return cell ? cell.columnIndex : (-1 * index);
    }
}