import { Injectable } from '@angular/core';
import { ContentTypeEnum } from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

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
                height: spreadsheetState.rowHeight,
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