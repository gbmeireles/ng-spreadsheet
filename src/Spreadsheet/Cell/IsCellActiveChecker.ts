import { Injectable } from '@angular/core';
import {
    GridCell,
} from '../../Model/Model';
import {
    ActiveCellManager,
} from '../../Services/Services';

@Injectable()
export class IsCellActiveChecker {

    constructor(private activeCellManager: ActiveCellManager) { }

    check(gridCell: GridCell) {
        var activeCell = this.activeCellManager.get();
        if (!gridCell || activeCell == null) {
            return false;
        } else if (activeCell.rowIndex !== gridCell.rowIndex) {
            return false;
        } else if (activeCell.columnIndex !== gridCell.columnIndex) {
            return false;
        } else {
            return true;
        }
    }
}