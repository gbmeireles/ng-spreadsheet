import { Injectable } from '@angular/core';
import { ContentTypeEnum } from '../model';
import { SpreadsheetState } from '../spreadsheet/spreadsheet-state';

@Injectable()
export class NumberTitleRowListGetter {

  constructor() { }

  get(spreadsheetState: SpreadsheetState) {
    var index = 0;
    if (spreadsheetState.titleSpreadsheetRowList.length === 0) {
      return [];
    }

    var numberTitleRowList = new Array(spreadsheetState.titleSpreadsheetRowList.length);
    while (index < spreadsheetState.titleSpreadsheetRowList.length) {
      let visibleRow = spreadsheetState.titleSpreadsheetRowList[index];
      let numberDataRow = {
        cellList: [],
        height: spreadsheetState.titleRowHeight,
        rowData: null,
        rowIndex: visibleRow.rowIndex,
        rowNumber: visibleRow.rowIndex + 1,
        rowStyle: '',
        rowType: ContentTypeEnum.Title,
        sectionRowIndex: visibleRow.sectionRowIndex,
        isVisible: true,
      };
      numberTitleRowList[index] = numberDataRow;
      index++;
    }
    return numberTitleRowList;
  }
}