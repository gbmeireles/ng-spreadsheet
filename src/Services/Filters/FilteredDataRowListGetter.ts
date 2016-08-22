import { Injectable } from '@angular/core';
import { NumberFilter } from './NumberFilter';
import { TextFilter } from './TextFilter';
import { ColumnDataTypeEnum } from '../../Model/Model';
import { SpreadsheetSectionListGetter } from '../SpreadsheetSectionListGetter';
import { SpreadsheetState } from '../../SpreadSheet/SpreadsheetState';
@Injectable()
export class FilteredDataRowListGetter {

    constructor(private spreadsheetSectionListGetter: SpreadsheetSectionListGetter,
        private numberFilter: NumberFilter,
        private textFilter: TextFilter) { }

    getList(spreadsheetState: SpreadsheetState) {
        var originalSpreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        var rowDataToRemoveList = [];
        Object.keys(spreadsheetState.filterExpressionMap).forEach(spreadsheetColumnIndexStr => {
            var spreadsheetColumnIndex = parseInt(spreadsheetColumnIndexStr, 10);
            var expression = spreadsheetState.filterExpressionMap[spreadsheetColumnIndex];
            if (!expression || expression.trim() == '') {
                return;
            }

            var spreadsheetColumn = spreadsheetState.spreadsheetColumnList.find(gc => gc.index == spreadsheetColumnIndex);
            var spreadsheetSection = originalSpreadsheetSectionList.find(gs => gs.name === spreadsheetColumn.sectionName);
            var filterFn: (data: any) => boolean = () => true;
            switch (spreadsheetColumn.dataType) {
                case ColumnDataTypeEnum.Number:
                    filterFn = this.numberFilter.getIsMatchFn(expression);
                    break;
                case ColumnDataTypeEnum.Text:
                    filterFn = this.textFilter.getIsMatchFn(expression);
                    break;
                case ColumnDataTypeEnum.Date:
                    filterFn = () => true;
                    break;
            }

            spreadsheetSection.dataRowList
                .filter(dr => !filterFn(dr.cellMap[spreadsheetColumnIndex].data))
                .forEach(dr => {
                    if (rowDataToRemoveList.indexOf(dr.rowData) >= 0) {
                        return;
                    }
                    rowDataToRemoveList.push(dr.rowData);
                });
        });

        var spreadsheetSectionDataRowList = spreadsheetState.dataRowList;
        var result = new Array(spreadsheetState.dataRowList.length - rowDataToRemoveList.length);
        var index = 0;
        spreadsheetState.dataRowList.forEach(dr => {
            if (rowDataToRemoveList.indexOf(dr) < 0) {
                result[index] = dr;
                index++;
            }
        });

        return result;
    }
}