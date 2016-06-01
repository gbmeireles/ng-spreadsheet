import { Injectable } from '@angular/core';
import {GridRowspanSetter} from '../Services/GridRowspanSetter';
import {
    GridData,
    GridRow,
    ContentTypeEnum,
    ColumnDefinition,
} from '../Model/Model';

@Injectable()
export class DataGridRowListGetter {
    constructor(private gridRowRowspanSetter: GridRowspanSetter) {

    }

    get(gridData: GridData, gridColumnList: Column[], titleRowListCount: number): GridRow[] {
        var result: GridRow[] = new Array(gridData.dataRowList.length);
        var columnListMap: { [tableSection: string]: ColumnDefinition[] } = {};
        gridData.columnDefinitionList.forEach(c => {
            if (!columnListMap[c.gridSection]) {
                columnListMap[c.gridSection] = [];
            }
            columnListMap[c.gridSection].push(c);
        });

        var counter = 0;
        var cellCounter = 0;
        gridData.dataRowList.forEach(rowData => {
            var rowDataGridRowList: GridRow[] = [];
            gridColumnList.forEach(gridColumn => {
                var indexOfColumn = gridColumnList.indexOf(gridColumn);
                var column = columnListMap[gridColumn.gridSectionName][indexOfColumn];

                var dataCellMatrix = column.getDataCellMatrix(gridData, rowData, gridColumn);
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
                            cellList: new Array(gridColumnList.length),
                            height: gridData.rowHeight,
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

            if (gridData.getRowStyle) {
                row.rowStyle = gridData.getRowStyle(row.rowData, row.rowType, row.sectionRowIndex);
            }
        }

        this.gridRowRowspanSetter.set(result);

        return result;
    }
}