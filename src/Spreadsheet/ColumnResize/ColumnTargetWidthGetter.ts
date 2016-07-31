import { Injectable } from '@angular/core';
import {
    CellListMapManager,
} from '../../Services/Services';

@Injectable()
export class ColumnTargetWidthGetter {

    constructor(private cellListMapManager: CellListMapManager) { }

    getTargetWidth(columnName: string): number {
        return this.cellListMapManager.getCellList(columnName).reduce((targetWidth, cell) => {
            return Math.max(cell.getScrollWidth(), targetWidth);
        }, 50) + 5;
    }

}

export default ColumnTargetWidthGetter;