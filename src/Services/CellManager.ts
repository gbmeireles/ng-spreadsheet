import { Injectable } from '@angular/core';
import { Cell, GridColumn } from '../Model/Model';

@Injectable()
export class CellManager {
    private cellList: Cell[] = [];
    constructor() {

    }

    getCellList() {
        return this.cellList.slice(0);
    }

    getCellListByGridColumnIndex(gridColumnIndex: number) {
        return this.cellList.filter(c => c.gridColumnIndex === gridColumnIndex);
    }

    addCell(cell: Cell) {
        this.cellList.push(cell);
    }

    removeCell(cell: Cell) {
        var index = this.cellList.indexOf(cell);
        if (index < 0) {
            return;
        }
        this.cellList.splice(index, 1);
    }
}