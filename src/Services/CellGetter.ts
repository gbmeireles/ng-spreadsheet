import { Injectable } from '@angular/core';
import { CellManager } from './CellManager';
import { Cell, CellLocation } from '../Model/Model';

@Injectable()
export class CellGetter {
    constructor(private cellManager: CellManager) {

    }

    get(cellLocation: CellLocation): Cell {
        var cellList = this.cellManager.getCellListByGridColumnIndex(cellLocation.gridColumnIndex);
        return cellList.find(c => c.gridCell.rowIndex === cellLocation.rowIndex);
    }
}