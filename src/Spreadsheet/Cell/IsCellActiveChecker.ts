import { Injectable } from '@angular/core';
import {
    GridCell,
    CellLocation,
} from '../../Model/Model';

@Injectable()
export class IsCellActiveChecker {

    constructor() { }

    check(gridCell: GridCell, activeCellLocation: CellLocation): boolean {
        if (!gridCell || activeCellLocation == null) {
            return false;
        } else if (activeCellLocation.rowIndex !== gridCell.rowIndex) {
            return false;
        } else if (activeCellLocation.gridColumnIndex !== gridCell.columnIndex) {
            return false;
        } else {
            return true;
        }
    }
}