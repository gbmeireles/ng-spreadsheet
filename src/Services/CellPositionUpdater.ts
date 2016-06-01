import { Injectable } from '@angular/core';
import { Cell, ColumnPositionInformationMap } from '../Model/Model';

@Injectable()
export class CellPositionUpdater {
    update(cell: Cell, columnPositionInformationMap: ColumnPositionInformationMap) {
        var columnPositionInformation = columnPositionInformationMap[cell.columnIndex];
        if (columnPositionInformation) {
            cell.width = columnPositionInformation.width;
            cell.left = columnPositionInformation.left;
        }
    }
}