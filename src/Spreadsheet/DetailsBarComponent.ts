import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellManager, ColumnIdentifierMapGetter } from '../Services/Services';
import { CellLocation, SpreadsheetColumn } from '../Model/Model';
import { Subject } from 'rxjs/Subject';

const css = `
:host {
    display: block;
    height: 36px;
    position: relative;
    background-color: #E6E6E6;
}

i {
    display: block;
    position: absolute;
    font-size: 14px;
    top: 10px;
    left: 5px;
}

.cell-location {
    display: inline-block;
    position: absolute;
    left: 25px;
    top: 6px;
    bottom: 6px;
    width: 55px;
    font-size: 12px;
    background-color: #FAFAFA;
    border: 1px solid #C6C6C6;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 5px;
    line-height: 22px;
    vertical-align: middle;
}

.cell-content {
    display: inline-block;
    left: 85px;
    top: 6px;
    right: 5px;
    bottom: 6px;
    position: absolute;
    padding-left: 5px;
    font-size: 12px;
    background-color: #FAFAFA;
    border: 1px solid #C6C6C6;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 22px;
}

.download-button {
    display: block;
    top: 11px;
    right: 20px;
    position: absolute;
}

.toggle-full-button {
    display: block;
    top: 11px;
    right: 9px;
    position: absolute;
}
`;

const html = `
<i class="icon-logo"></i>
<span class="cell-location">{{cellLocation}}</span>
<span class="cell-content">{{activeCellData}}</span>
<span class="download-button" (click)="onDownload.next()"></span>
<span class="toggle-full-button" [class.is-full]="isFull" (click)="toggleFullScreen()"></span>
`;

@Component({
    selector: 'DetailsBar',
    template: html,
    styles: [css],
})
export class DetailsBarComponent implements OnInit {
    @Input('activeCellLocation') activeCellLocation: CellLocation;
    @Input('spreadsheetColumnList') spreadsheetColumnList: SpreadsheetColumn[];
    @Output('download') onDownload: Subject<void> = new Subject<void>();
    @Output('toggleFullScreen') onToggleFullScreen: Subject<boolean> = new Subject<boolean>();

    private activeCellData: string = 'Selecione uma célula';
    private columnIdentifierMap: { [spreadsheetColumnIndex: number]: string } = {};
    private cellLocation: string = '--';
    private isFull: boolean = false;

    constructor(private cellManager: CellManager,
        private columnIdentifierMapGetter: ColumnIdentifierMapGetter) { }

    ngOnInit() {
    }

    ngOnChanges(obj) {
        if (obj['spreadsheetColumnList']) {
            this.columnIdentifierMap = this.columnIdentifierMapGetter.getMap(this.spreadsheetColumnList);
        }
        if (obj['activeCellLocation']) {
            var activeCell = this.cellManager.getCellListBySpreadsheetColumnIndex(this.activeCellLocation.columnIndex)
                .find(cell => cell.spreadsheetCell && cell.spreadsheetCell.rowIndex === this.activeCellLocation.rowIndex);
            if (!activeCell) {
                return;
            }
            var spreadsheetCell = activeCell.spreadsheetCell;
            if (spreadsheetCell.formatData == undefined) {
                this.activeCellData = spreadsheetCell.data;
            } else {
                this.activeCellData = spreadsheetCell.formatData(spreadsheetCell.data);
            }
            this.cellLocation = this.columnIdentifierMap[this.activeCellLocation.columnIndex] + (spreadsheetCell.rowIndex + 1);
        }
    }

    toggleFullScreen() {
        this.isFull = !this.isFull;
        this.onToggleFullScreen.next(this.isFull);
    }

}