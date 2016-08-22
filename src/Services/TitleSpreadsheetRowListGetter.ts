import { Injectable } from '@angular/core';
import { SpreadsheetRowspanSetter } from '../Services/SpreadsheetRowspanSetter';
import {
    SpreadsheetRow,
    ColumnDefinition,
    ContentTypeEnum,
    Column,
    SpreadsheetSection,
} from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class TitleSpreadsheetRowListGetter {
    constructor(private spreadsheetRowRowspanSetter: SpreadsheetRowspanSetter) {
    }

    get(spreadsheetState: SpreadsheetState): SpreadsheetRow[] {
        var result: SpreadsheetRow[] = [];
        var columnDefinitionMap: { [columnName: string]: ColumnDefinition } = {};
        spreadsheetState.columnList.forEach(column => {
            var columnDefinition = spreadsheetState.columnDefinitionList.find(cd => cd.name === column.name);
            columnDefinitionMap[column.name] = columnDefinition;
        });

        spreadsheetState.columnList.forEach(column => {
            var columnDefinition = columnDefinitionMap[column.name];

            var titleCellMatrix = columnDefinition.getTitleCellMatrix(column, spreadsheetState.columnDefinitionList);
            for (var i = 0; i < titleCellMatrix.length; i++) {
                var row: SpreadsheetRow = null;
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
        var result = completeRowList.map(cs => {
            var row = <SpreadsheetRow>Object.assign({}, cs);
            row.cellList = cs.cellList.filter(cell => sectionColumnIndexList.indexOf(cell.columnIndex) >= 0);
            row.cellMap = {};
            row.cellList.forEach(cell => {
                var columnCellIndex = 0;
                while (columnCellIndex < cell.colspan) {
                    row.cellMap[cell.columnIndex + columnCellIndex] = cell;
                    columnCellIndex++;
                }
            });

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

            return row;
        });

        return result;
    }
}