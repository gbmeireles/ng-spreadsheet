import { Injectable } from '@angular/core';
import { CellManager } from '../../Services/Services';

@Injectable()
export class ColumnTargetWidthGetter {

    constructor(private cellManager:CellManager) { }

    getTargetWidth(gridColumnIndex: number): number {
        return this.cellManager.getCellListByGridColumnIndex(gridColumnIndex).reduce((targetWidth, cell) => {
            return Math.max(cell.getScrollWidth(), targetWidth);
        }, 50) + 5;
    }

}

export default ColumnTargetWidthGetter;