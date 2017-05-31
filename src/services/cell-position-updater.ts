import { Injectable } from '@angular/core';
import { Cell, ColumnPositionInformationMap } from '../model/model';

@Injectable()
export class CellPositionUpdater {
    update(cell: Cell, columnPositionInformationMap: ColumnPositionInformationMap) {
        var columnPositionInformation = columnPositionInformationMap[cell.spreadsheetColumnIndex];
        if (columnPositionInformation) {
            cell.width = columnPositionInformation.width;
            cell.left = columnPositionInformation.left;
        }
    }
}