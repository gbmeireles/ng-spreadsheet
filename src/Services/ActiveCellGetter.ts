import { Injectable } from '@angular/core';
import {
    CellListMapManager,
} from '../Services/Managers/Managers';
import { CellNavigator } from '../Services/CellNavigator';
import { Cell } from '../Model/Model';

@Injectable()
export class ActiveCellGetter {
    constructor(private cellListMapManager: CellListMapManager,
        private cellNavigator: CellNavigator) {

    }

    get(): Cell {
        var cellIndexData = this.cellNavigator.getCurrentActiveCellIndexData();
        var cellListMap = this.cellListMapManager.getCellListMap();
        var cellList: Cell[] = [];
        Object.keys(cellListMap).forEach(key => cellList = cellList.concat(cellListMap[key]));

        var activeCell = cellList
            .find(cell => cell.gridCell.columnIndex === cellIndexData.columnIndex && cell.gridCell.rowIndex === cellIndexData.rowIndex);

        return activeCell;
    }
}