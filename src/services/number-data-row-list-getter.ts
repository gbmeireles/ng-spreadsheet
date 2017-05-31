import { Injectable } from '@angular/core';
import { ContentTypeEnum } from '../model/model';
import { SpreadsheetState } from '../spreadsheet/spreadsheet-state';
@Injectable()
export class NumberDataRowListGetter {

    constructor() { }

    get(spreadsheetState: SpreadsheetState) {
        var index = 0;
        var spreadsheetSection = spreadsheetState.spreadsheetSectionList[0];
        if (!spreadsheetSection) {
            return [];
        }

        var rowToCreateCount = spreadsheetSection.visibleDataRowList.length;
        var numberDataRowList = new Array(rowToCreateCount);
        var titleRowCount = spreadsheetState.numberTitleRowList.length;
        while (index < rowToCreateCount) {
            let visibleRow = spreadsheetSection.visibleDataRowList[index];
            let numberDataRow = {
                cellList: [],
                height: spreadsheetState.rowHeight,
                rowData: null,
                rowIndex: visibleRow.rowIndex,
                rowNumber: visibleRow.rowData && visibleRow.rowData.rowNumber
                    ? visibleRow.rowData.rowNumber + titleRowCount
                    : visibleRow.rowIndex + 1,
                rowStyle: '',
                rowType: ContentTypeEnum.Data,
                sectionRowIndex: visibleRow.sectionRowIndex,
                isVisible: true,
            };
            numberDataRowList[index] = numberDataRow;
            index++;
        }
        return numberDataRowList;
    }
}