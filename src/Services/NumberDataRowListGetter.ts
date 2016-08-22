import { Injectable } from '@angular/core';
import { ContentTypeEnum } from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';
@Injectable()
export class NumberDataRowListGetter {

    constructor() { }

    get(spreadsheetState: SpreadsheetState) {
        var index = 0;
        var spreadsheetSection = spreadsheetState.spreadsheetSectionList[0];
        if (!spreadsheetSection) {
            return [];
        }

        var numberDataRowList = new Array(spreadsheetSection.visibleDataRowList.length);
        while (index < spreadsheetSection.visibleDataRowList.length) {
            let visibleRow = spreadsheetSection.visibleDataRowList[index];
            let numberDataRow = {
                cellList: [],
                height: spreadsheetState.rowHeight,
                rowData: null,
                rowIndex: visibleRow.rowIndex,
                rowNumber: visibleRow.rowIndex + 1,
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