import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellManager, ColumnIdentifierMapGetter } from '../Services/Services';
import { CellLocation, GridColumn } from '../Model/Model';
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
    right: 9px;
    position: absolute;
}
`;

const html = `
<i class="icon-logo"></i>
<span class="cell-location">{{cellLocation}}</span>
<span class="cell-content">{{activeCellData}}</span>
<span class="download-button" (click)="onDownload.emit()"></span>
`;

@Component({
    selector: 'DetailsBar',
    template: html,
    styles: [css],
})
export class DetailsBarComponent implements OnInit {
    @Input('activeCellLocation') activeCellLocation: CellLocation;
    @Input('gridColumnList') gridColumnList: GridColumn[];
    @Output('download') onDownload: EventEmitter<void> = new EventEmitter<void>(false);

    private activeCellData: string = 'Selecione uma célula';
    private columnIdentifierMap: { [gridColumnIndex: number]: string } = {};
    private cellLocation: string = '--';

    constructor(private cellManager: CellManager,
        private columnIdentifierMapGetter: ColumnIdentifierMapGetter) { }

    ngOnInit() {
    }

    ngOnChanges(obj) {
        if (obj['gridColumnList']) {
            this.columnIdentifierMap = this.columnIdentifierMapGetter.getMap(this.gridColumnList);
        }
        if (obj['activeCellLocation']) {
            var activeCell = this.cellManager.getCellListByGridColumnIndex(this.activeCellLocation.gridColumnIndex)
                .find(cell => cell.gridCell.rowIndex === this.activeCellLocation.rowIndex);
            if (!activeCell) {
                return;
            }
            var gridCell = activeCell.gridCell;
            if (gridCell.formatData == undefined) {
                this.activeCellData = gridCell.data;
            } else {
                this.activeCellData = gridCell.formatData(gridCell.data);
            }
            this.cellLocation = this.columnIdentifierMap[this.activeCellLocation.gridColumnIndex] + (gridCell.rowIndex + 1);
        }
    }

}