import { Injectable } from '@angular/core';
import { NumberFilter } from './NumberFilter';
import { TextFilter } from './TextFilter';
import { ColumnDataTypeEnum } from '../../Model/Model';
import { GridSectionListGetter } from '../GridSectionListGetter';
import { SpreadsheetState } from '../../SpreadSheet/SpreadsheetState';
@Injectable()
export class FilteredDataRowListGetter {

    constructor(private gridSectionListGetter: GridSectionListGetter,
        private numberFilter: NumberFilter,
        private textFilter: TextFilter) { }

    getList(spreadsheetState: SpreadsheetState) {
        var originalGridSectionList = this.gridSectionListGetter.get(spreadsheetState);
        var rowDataToRemoveList = [];
        Object.keys(spreadsheetState.filterExpressionMap).forEach(gridColumnIndexStr => {
            var gridColumnIndex = parseInt(gridColumnIndexStr, 10);
            var expression = spreadsheetState.filterExpressionMap[gridColumnIndex];
            if (!expression || expression.trim() == '') {
                return;
            }

            var gridColumn = spreadsheetState.gridColumnList.find(gc => gc.index == gridColumnIndex);
            var gridSection = originalGridSectionList.find(gs => gs.name === gridColumn.gridSectionName);
            var filterFn: (data: any) => boolean = () => true;
            switch (gridColumn.dataType) {
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

            gridSection.dataRowList
                .filter(dr => !filterFn(dr.cellMap[gridColumnIndex].data))
                .forEach(dr => {
                    if (rowDataToRemoveList.indexOf(dr.rowData) >= 0) {
                        return;
                    }
                    rowDataToRemoveList.push(dr.rowData);
                });
        });

        var gridSectionDataRowList = spreadsheetState.dataRowList;
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