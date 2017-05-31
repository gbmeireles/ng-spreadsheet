import { Injectable } from '@angular/core';
import {
    SpreadsheetRow,
    SpreadsheetSection,
    Column,
    ColumnDefinition,
    ColumnPositionInformationMap,
} from '../model/model';
import { TitleSpreadsheetRowListGetter } from '../services/title-spreadsheet-row-list-getter';
import { DataSpreadsheetRowListGetter } from '../services/data-spreadsheet-row-list-getter';
import { RowToRenderIndexListGetter } from '../services/row-to-render-index-list-getter';
import { SpreadsheetState } from '../spreadsheet/spreadsheet-state';

@Injectable()
export class SpreadsheetSectionListGetter {
    constructor(private titleSpreadsheetRowListGetter: TitleSpreadsheetRowListGetter,
        private dataSpreadsheetRowListGetter: DataSpreadsheetRowListGetter,
        private rowToRenderIndexListGetter: RowToRenderIndexListGetter) {
    }

    get(spreadsheetState: SpreadsheetState) {
        var spreadsheetColumnListMap: { [spreadsheetSectionName: string]: Column[] } = {};
        spreadsheetState.columnList.forEach(column => {
            if (!spreadsheetColumnListMap[column.sectionName]) {
                spreadsheetColumnListMap[column.sectionName] = [];
            }
            spreadsheetColumnListMap[column.sectionName].push(column);
        });

        var spreadsheetSectionList: SpreadsheetSection[] = [];
        Object.keys(spreadsheetColumnListMap).forEach(tableSectionName => {
            var spreadsheetSectionColumnList = spreadsheetColumnListMap[tableSectionName];
            spreadsheetSectionList.push({
                columnList: spreadsheetSectionColumnList,
                dataRowList: [],
                dataRowMap: {},
                name: tableSectionName,
                titleRowList: [],
                dataRowListLength: 0,
            });
        });

        spreadsheetSectionList.forEach(spreadsheetSection => {
            spreadsheetSection.columnList = spreadsheetSection.columnList.filter(gc => gc.sectionName === spreadsheetSection.name);

            var spreadsheetSectionColumnIdList: Array<number> = [];
            spreadsheetSection.columnList.forEach(column => {
                var columnIndex = column.startIndex;
                while (columnIndex <= column.endIndex) {
                    spreadsheetSectionColumnIdList.push(columnIndex);
                    columnIndex++;
                }
            });

            var titleRowList =
                this.titleSpreadsheetRowListGetter.getBySection(spreadsheetState, spreadsheetSection, spreadsheetState.titleSpreadsheetRowList);
            var dataRowList =
                this.dataSpreadsheetRowListGetter.getBySection(spreadsheetState, spreadsheetSection, spreadsheetState.dataSpreadsheetRowList);

            spreadsheetSection.titleRowList = titleRowList.map<SpreadsheetRow>(row => {
                return {
                    cellList: row.cellList.filter(c => spreadsheetSectionColumnIdList.indexOf(c.columnIndex) >= 0),
                    cellMap: row.cellMap,
                    height: spreadsheetState.rowHeight,
                    rowData: row.rowData,
                    rowIndex: row.rowIndex,
                    rowStyle: row.rowStyle,
                    rowType: row.rowType,
                    sectionRowIndex: row.sectionRowIndex,
                    top: top,
                    visibleCellList: row.visibleCellList,
                };
            });

            spreadsheetSection.dataRowList = new Array(dataRowList.length);
            spreadsheetSection.dataRowMap = {};
            var counter = 0;
            dataRowList.forEach(row => {
                var cellList = new Array(row.cellList.length);
                var index = 0;
                row.cellList.forEach(c => {
                    if (spreadsheetSectionColumnIdList.indexOf(c.columnIndex) < 0) {
                        return;
                    }
                    cellList[index] = c;
                    index++;
                });
                cellList.length = index;
                var spreadsheetRow = {
                    cellList: cellList,
                    cellMap: row.cellMap,
                    height: spreadsheetState.rowHeight,
                    rowData: row.rowData,
                    rowIndex: row.rowIndex,
                    rowStyle: row.rowStyle,
                    rowType: row.rowType,
                    sectionRowIndex: row.sectionRowIndex,
                    visibleCellList: row.visibleCellList,
                };
                spreadsheetSection.dataRowList[counter] = spreadsheetRow;
                spreadsheetSection.dataRowMap[spreadsheetRow.sectionRowIndex] = spreadsheetRow;
                counter++;
            });
            var lastRow = spreadsheetSection.dataRowList[spreadsheetSection.dataRowList.length - 1];
            var rowToRenderIndexList = this.rowToRenderIndexListGetter.getListForSpreadsheetSection(spreadsheetState, spreadsheetSection);
            spreadsheetSection.visibleDataRowList =
                rowToRenderIndexList.map(index => spreadsheetSection.dataRowList[index]).filter(row => row != null);
            spreadsheetSection.dataRowListLength = spreadsheetSection.dataRowList.length;
        });

        return spreadsheetSectionList;
    }
}