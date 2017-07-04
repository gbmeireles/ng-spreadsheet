import { Injectable } from '@angular/core';
import { SpreadsheetState } from '../spreadsheet/spreadsheet-state';

@Injectable()
export class SpreadsheetSectionScrollWidthMapCalculator {

  constructor() { }

  calculate(spreadsheetState: SpreadsheetState): { [spreadsheetSectionMap: string]: number } {
    var result = {};
    spreadsheetState.spreadsheetSectionList.forEach(spreadsheetSection => {
      var scrollWidth = 0;
      var spreadsheetColumnList = spreadsheetState.spreadsheetColumnList.filter(gc => gc.sectionName === spreadsheetSection.name);

      spreadsheetColumnList.forEach(gc => scrollWidth += spreadsheetState.columnPositionInformationMap[gc.index].width);

      var spreadSectionWidth = spreadsheetState.spreadsheetSectionPositionInformationMap[spreadsheetSection.name].width;
      if (scrollWidth - spreadSectionWidth > 5) {
        result[spreadsheetSection.name] = scrollWidth + 5;
      } else {
        result[spreadsheetSection.name] = scrollWidth;
      }
    });
    return result;
  }
}