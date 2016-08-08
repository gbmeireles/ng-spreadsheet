import { Injectable } from '@angular/core';
import { ContentTypeEnum } from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class NumberTitleRowListGetter {

    constructor() { }

    get(spreadsheetState: SpreadsheetState) {
        var index = 0;
        var gridSection = spreadsheetState.gridSectionList[0];
        if (!gridSection) {
            return [];
        }

        var numberTitleRowList = new Array(gridSection.titleRowList.length);
        while (index < gridSection.titleRowList.length) {
            let visibleRow = gridSection.titleRowList[index];
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