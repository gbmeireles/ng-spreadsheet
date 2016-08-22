import { Injectable } from '@angular/core';
import { SpreadsheetColumn } from '../Model/Model';

const columnUnitList: string[] =
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

@Injectable()
export class ColumnIdentifierMapGetter {

    constructor() { }

    getMap(spreadsheetColumnList: SpreadsheetColumn[]) {
        var spreadsheetColumnIdentifierMap = {};

        if (!spreadsheetColumnList) {
            return spreadsheetColumnIdentifierMap;
        }

        var tensCount = 0;
        var unitCount = 0;

        spreadsheetColumnList.forEach(gc => {
            unitCount = gc.index % columnUnitList.length;
            tensCount = Math.floor(gc.index / columnUnitList.length);
            var columnIdentifier = '';
            if (tensCount > 0) {
                columnIdentifier = columnUnitList[tensCount - 1];
            }
            columnIdentifier = columnIdentifier + columnUnitList[unitCount];
            spreadsheetColumnIdentifierMap[gc.index] = columnIdentifier;
        });

        return spreadsheetColumnIdentifierMap;
    }
}