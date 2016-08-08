import { Injectable } from '@angular/core';
import { GridRowspanSetter } from '../Services/GridRowspanSetter';
import {
    GridRow,
    ContentTypeEnum,
    ColumnDefinition,
    Column,
    GridSection,
} from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class DataGridRowListGetter {
    constructor(private gridRowRowspanSetter: GridRowspanSetter) {

    }

    get(spreadsheetState: SpreadsheetState, gridSection: GridSection, titleRowListCount: number): GridRow[] {
        var result: GridRow[] = new Array(spreadsheetState.dataRowList.length);
        var columnDefinitionListMap: { [tableSection: string]: ColumnDefinition[] } = {};
        gridSection.columnList.forEach(column => {
            if (!columnDefinitionListMap[column.gridSectionName]) {
                columnDefinitionListMap[column.gridSectionName] = [];
            }
            var columnDefinition = spreadsheetState.columnDefinitionList.find(cd => cd.name === column.name);
            columnDefinitionListMap[column.gridSectionName].push(columnDefinition);
        });

        var counter = 0;
        var cellCounter = 0;
        spreadsheetState.dataRowList.forEach(rowData => {
            var rowDataGridRowList: GridRow[] = [];
            gridSection.columnList.forEach(column => {
                var indexOfColumn = gridSection.columnList.indexOf(column);
                var columnDefinition = columnDefinitionListMap[column.gridSectionName][indexOfColumn];

                var dataCellMatrix = columnDefinition.getDataCellMatrix(rowData, column);
                var lastRow: GridRow = null;
                for (var i = 0; i < dataCellMatrix.length; i++) {
                    var row: GridRow = null;
                    if (rowDataGridRowList.length >= i + 1) {
                        row = rowDataGridRowList[i];
                    }
                    if (row == null) {
                        if (result[counter - 1]) {
                            result[counter - 1].cellList.length = cellCounter;
                        }
                        cellCounter = 0;
                        row = {
                            cellList: new Array(gridSection.columnList.length),
                            height: spreadsheetState.rowHeight,
                            rowData: rowData,
                            rowIndex: 0,
                            rowStyle: '',
                            rowType: ContentTypeEnum.Data,
                            sectionRowIndex: 0,
                        };
                        rowDataGridRowList.push(row);
                        result[counter] = row;
                        counter++;
                    }
                    var dataCellMatrixLength = dataCellMatrix[i].length;
                    var dataCellCounter = 0;
                    while (dataCellCounter < dataCellMatrixLength) {
                        row.cellList[cellCounter] = dataCellMatrix[i][dataCellCounter];
                        cellCounter++;
                        dataCellCounter++;
                    }
                }
                if (result[counter - 1]) {
                    result[counter - 1].cellList.length = cellCounter;
                }
            });
        });

        var lastIndex = result.length;
        for (var i = 0; i < lastIndex; i++) {
            var row = result[i];
            row.rowIndex = i + titleRowListCount;
            row.sectionRowIndex = i;
            row.visibleCellList = row.cellList.slice(0, 20);
            row.cellMap = {};
            row.cellList.forEach(cell => {
                cell.rowIndex = row.rowIndex;
                cell.sectionRowIndex = row.sectionRowIndex;
                cell.cellType = row.rowType;
                row.cellMap[cell.columnIndex] = cell;
            });

            if (spreadsheetState.getRowStyle) {
                row.rowStyle = spreadsheetState.getRowStyle(row.rowData, row.rowType, row.sectionRowIndex);
            }
        }

        this.gridRowRowspanSetter.set(result);

        return result;
    }
}