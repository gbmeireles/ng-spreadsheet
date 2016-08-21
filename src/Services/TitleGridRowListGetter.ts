import { Injectable } from '@angular/core';
import { SpreadsheetRowspanSetter } from '../Services/GridRowspanSetter';
import {
    GridRow,
    ColumnDefinition,
    ContentTypeEnum,
    Column,
    GridSection,
} from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class TitleGridRowListGetter {
    constructor(private gridRowRowspanSetter: SpreadsheetRowspanSetter) {

    }

    get(spreadsheetState: SpreadsheetState, gridSection: GridSection): GridRow[] {
        var result: GridRow[] = [];
        var columnDefinitionListMap: { [tableSection: string]: ColumnDefinition[] } = {};
        gridSection.columnList.forEach(column => {
            if (!columnDefinitionListMap[column.gridSectionName]) {
                columnDefinitionListMap[column.gridSectionName] = [];
            }
            var columnDefinition = spreadsheetState.columnDefinitionList.find(cd => cd.name === column.name);
            columnDefinitionListMap[column.gridSectionName].push(columnDefinition);
        });

        gridSection.columnList.forEach(column => {
            var indexOfColumn = gridSection.columnList.indexOf(column);
            var columnDefinition = columnDefinitionListMap[column.gridSectionName][indexOfColumn];

            var titleCellMatrix = columnDefinition.getTitleCellMatrix(column);
            for (var i = 0; i < titleCellMatrix.length; i++) {
                var row: GridRow = null;
                if (result.length >= i + 1) {
                    row = result[i];
                }
                if (row == null) {
                    row = {
                        cellList: [],
                        height: spreadsheetState.rowHeight,
                        rowData: null,
                        rowIndex: i,
                        rowStyle: '',
                        rowType: ContentTypeEnum.Title,
                        sectionRowIndex: i,
                    };
                    result.push(row);
                }
                row.cellList = row.cellList.concat(titleCellMatrix[i]);
            }
        });

        var columnToRenderIndex = spreadsheetState.gridSectionColumnToRendexIndexListMap[gridSection.name];
        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            row.rowIndex = i;
            row.sectionRowIndex = i;
            var lastCell = row.cellList[row.cellList.length - 1];
            row.cellMap = {};
            row.cellList.forEach(cell => {
                cell.rowIndex = row.rowIndex;
                cell.sectionRowIndex = row.sectionRowIndex;
                cell.cellType = row.rowType;
                row.cellMap[cell.columnIndex] = cell;
            });
            row.visibleCellList = columnToRenderIndex ? columnToRenderIndex.map(cri => row.cellMap[cri]) : row.cellList.slice(0, 20);
            if (spreadsheetState.getRowStyle) {
                row.rowStyle = spreadsheetState.getRowStyle(row.rowData, row.rowType, row.sectionRowIndex);
            }
        }

        this.gridRowRowspanSetter.set(result);

        return result;
    }
}