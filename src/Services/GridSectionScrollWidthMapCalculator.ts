import { Injectable } from '@angular/core';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class GridSectionScrollWidthMapCalculator {

    constructor() { }

    calculate(spreadsheetState: SpreadsheetState): { [gridSectionMap: string]: number } {
        var result = {};
        spreadsheetState.gridSectionList.forEach(gridSection => {
            var scrollWidth = 0;
            var gridColumnList = spreadsheetState.gridColumnList.filter(gc => gc.gridSectionName === gridSection.name);

            gridColumnList.forEach(gc => scrollWidth += spreadsheetState.columnPositionInformationMap[gc.index].width);

            result[gridSection.name] = scrollWidth;
        });
        return result;
    }
}