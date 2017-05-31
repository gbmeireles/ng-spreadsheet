import { Injectable } from '@angular/core';
import { CellManager } from '../../services/services';

@Injectable()
export class ColumnTargetWidthGetter {

    constructor(private cellManager: CellManager) { }

    getTargetWidth(spreadsheetColumnIndex: number): number {
        return this.cellManager.getCellListBySpreadsheetColumnIndex(spreadsheetColumnIndex).reduce((targetWidth, cell) => {
            return Math.max(cell.getScrollWidth(), targetWidth);
        }, 50) + 5;
    }

}

export default ColumnTargetWidthGetter;