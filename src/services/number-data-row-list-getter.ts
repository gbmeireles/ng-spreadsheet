import { Injectable } from '@angular/core';
import { ContentTypeEnum } from '../model';
import { SpreadsheetState } from '../spreadsheet/spreadsheet-state';
import { RowToRenderIndexListGetter } from '../services/row-to-render-index-list-getter';
@Injectable()
export class NumberDataRowListGetter {

  constructor(private rowToRenderIndexListGetter: RowToRenderIndexListGetter) { }

  get(spreadsheetState: SpreadsheetState) {
    var index = 0;
    var spreadsheetSection = spreadsheetState.spreadsheetSectionList[0];
    if (!spreadsheetSection) {
      return [];
    }
    var visibleRowIndexList = this.rowToRenderIndexListGetter.getList(spreadsheetState);

    var rowToCreateCount = Math.max(visibleRowIndexList.length, 14);
    var numberDataRowList = new Array(rowToCreateCount);
    var titleRowCount = spreadsheetState.numberTitleRowList.length;
    var lastRowNumber = null;
    while (index < rowToCreateCount) {
      let visibleRow = spreadsheetSection.visibleDataRowList[index];
      let numberDataRow = {
        cellList: [],
        height: spreadsheetState.dataRowHeight,
        rowData: null,
        rowIndex: visibleRow && visibleRow.rowIndex || 0,
        rowNumber: visibleRow && visibleRow.rowData && visibleRow.rowData.rowNumber
          ? visibleRow.rowData.rowNumber + titleRowCount
          : (lastRowNumber || (visibleRow && visibleRow.rowIndex + 1)),
        rowStyle: '',
        rowType: ContentTypeEnum.Data,
        sectionRowIndex: visibleRow && visibleRow.sectionRowIndex || 0,
        isVisible: true,
      };
      if (visibleRow && visibleRow.rowData && visibleRow.rowData.lastRowNumber) {
        lastRowNumber = visibleRow.rowData.lastRowNumber;
      }
      numberDataRowList[index] = numberDataRow;
      if (lastRowNumber) {
        lastRowNumber++;
      }
      index++;
    }
    return numberDataRowList;
  }
}