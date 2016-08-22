import { Injectable } from '@angular/core';
import { SpreadsheetRowspanSetter } from '../Services/SpreadsheetRowspanSetter';
import {
    SpreadsheetRow,
    ContentTypeEnum,
    ColumnDefinition,
    Column,
    SpreadsheetSection,
} from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class DataSpreadsheetRowListGetter {
    constructor(private spreadsheetRowRowspanSetter: SpreadsheetRowspanSetter) {

    }

    get(spreadsheetState: SpreadsheetState, titleRowListCount: number) {
        var result: SpreadsheetRow[] = new Array(spreadsheetState.dataRowList.length);
        var columnDefinitionMap: { [columnName: string]: ColumnDefinition } = {};
        spreadsheetState.columnList.forEach(column => {
            var columnDefinition = spreadsheetState.columnDefinitionList.find(cd => cd.name === column.name);
            columnDefinitionMap[column.name] = columnDefinition;
        });

        var counter = 0;
        var cellCounter = 0;
        spreadsheetState.dataRowList.forEach(rowData => {
            var rowDataSpreadsheetRowList: SpreadsheetRow[] = [];
            spreadsheetState.columnList.forEach(column => {
                var columnDefinition = columnDefinitionMap[column.name];

                var dataCellMatrix = columnDefinition.getDataCellMatrix(rowData, column);
                var lastRow: SpreadsheetRow = null;
                for (var i = 0; i < dataCellMatrix.length; i++) {
                    var row: SpreadsheetRow = null;
                    if (rowDataSpreadsheetRowList.length >= i + 1) {
                        row = rowDataSpreadsheetRowList[i];
                    }
                    if (row == null) {
                        if (result[counter - 1]) {
                            result[counter - 1].cellList.length = cellCounter;
                        }
                        cellCounter = 0;
                        row = {
                            cellList: new Array(spreadsheetState.columnList.length),
                            height: spreadsheetState.rowHeight,
                            rowData: rowData,
                            rowIndex: 0,
                            rowStyle: '',
                            rowType: ContentTypeEnum.Data,
                            sectionRowIndex: 0,
                        };
                        rowDataSpreadsheetRowList.push(row);
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
            row.cellMap = {};
            if (spreadsheetState.getRowStyle) {
                row.rowStyle = spreadsheetState.getRowStyle(row.rowData, row.rowType, row.sectionRowIndex);
            }
        }

        this.spreadsheetRowRowspanSetter.set(result);

        return result;
    }

    getBySection(spreadsheetState: SpreadsheetState, spreadsheetSection: SpreadsheetSection, completeRowList: SpreadsheetRow[]): SpreadsheetRow[] {
        var sectionColumnIndexList: number[] =
            spreadsheetState.spreadsheetColumnList.filter(sc => sc.sectionName === spreadsheetSection.name).map(sc => sc.index);

        var columnToRenderIndexList = spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[spreadsheetSection.name];
        var result = new Array(completeRowList.length);
        var resultCount = result.length;
        var resultIndex = 0;
        while (resultIndex < resultCount) {
            var cs = completeRowList[resultIndex];
            var row = <SpreadsheetRow>Object.assign({}, cs);
            row.cellList = new Array(sectionColumnIndexList.length);
            row.cellMap = {};

            var counter = 0;
            var cellListIndex = 0;
            var cellListLength = cs.cellList.length;
            while (cellListIndex < cellListLength) {
                var cell = cs.cellList[cellListIndex];

                cellListIndex++;
                if (sectionColumnIndexList.indexOf(cell.columnIndex) < 0) {
                    continue;
                }
                cell.rowIndex = row.rowIndex;
                cell.sectionRowIndex = row.sectionRowIndex;
                cell.cellType = row.rowType;

                var columnCellIndex = 0;
                while (columnCellIndex < cell.colspan) {
                    row.cellMap[cell.columnIndex + columnCellIndex] = cell;
                    columnCellIndex++;
                }

                row.cellList[counter] = cell;
                counter++;
            }
            row.cellList.length = counter;

            if (columnToRenderIndexList) {
                row.visibleCellList = new Array(columnToRenderIndexList.length);
                var visibleCellIndex = 0;
                var index = 0;
                while (index < columnToRenderIndexList.length) {
                    var columnToRenderIndex = columnToRenderIndexList[visibleCellIndex];
                    var visibleCell = row.cellMap[columnToRenderIndex];
                    if (row.visibleCellList.indexOf(visibleCell) < 0) {
                        row.visibleCellList[visibleCellIndex] = visibleCell;
                        visibleCellIndex++;
                    }
                    index++;
                }
                row.visibleCellList.length = visibleCellIndex;
            } else {
                row.visibleCellList = row.cellList.slice(0, 20);
            }

            result[resultIndex] = row;
            resultIndex++;
        }

        return result;
    }
}