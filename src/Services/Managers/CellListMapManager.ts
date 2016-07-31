import { Injectable } from '@angular/core';
import { ColumnListManager } from './ColumnListManager';
import { Cell, GridColumn } from '../../Model/Model';

@Injectable()
export class CellListMapManager {
    private cellListMap: { [columnName: string]: Cell[] } = {};
    private gridColumnMap: { [columnIndex: number]: GridColumn } = {};
    constructor(private columnListManager: ColumnListManager) {

    }

    updateGridColumnMap(gridColumnMap: { [columnIndex: number]: GridColumn }) {
        this.gridColumnMap = gridColumnMap;
    }

    getCellListMap() {
        return this.cellListMap || {};
    }

    getCellList(columnName: string) {
        return this.cellListMap[columnName] || [];
    }

    addCell(cell: Cell) {
        var columnName = this.getColumnName(cell.gridColumnIndex);
        if (!this.cellListMap[columnName]) {
            this.cellListMap[columnName] = [];
        }
        if (this.cellListMap[columnName].indexOf(cell) >= 0) {
            return;
        }
        this.cellListMap[columnName].push(cell);
    }

    removeCell(cell: Cell) {
        var columnName = this.getColumnName(cell.gridColumnIndex);
        if (!this.cellListMap[columnName]) {
            return;
        }
        var index = this.cellListMap[columnName].indexOf(cell);
        if (index < 0) {
            return;
        }
        this.cellListMap[columnName].splice(index, 1);
    }

    private getColumnName(columnIndex: number): string {
        if (!this.gridColumnMap[columnIndex]) {
            console.error('Invalid column index ' + columnIndex);
            return;
        }
        return this.gridColumnMap[columnIndex].name;
    }
}