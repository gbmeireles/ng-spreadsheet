import { Injectable } from '@angular/core';
import { ContentTypeEnum } from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';
@Injectable()
export class NumberDataRowListGetter {

    constructor() { }

    get(spreadsheetState: SpreadsheetState) {
        var index = 0;
        var gridSection = spreadsheetState.gridSectionList[0];
        if (!gridSection) {
            return [];
        }

        var numberDataRowList = new Array(gridSection.visibleDataRowList.length);
        while (index < gridSection.visibleDataRowList.length) {
            let visibleRow = gridSection.visibleDataRowList[index];
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