import { Injectable } from '@angular/core';
import {
    GridRow,
    GridSection,
    Column,
    ColumnDefinition,
    ColumnPositionInformationMap,
} from '../Model/Model';
import { TitleGridRowListGetter } from '../Services/TitleGridRowListGetter';
import { DataGridRowListGetter } from '../Services/DataGridRowListGetter';
import { RowToRenderIndexListGetter } from '../Services/RowToRenderIndexListGetter';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class SpreadsheetSectionListGetter {
    constructor(private titleGridRowListGetter: TitleGridRowListGetter,
        private dataGridRowListGetter: DataGridRowListGetter,
        private rowToRenderIndexListGetter: RowToRenderIndexListGetter) {
    }

    get(spreadsheetState: SpreadsheetState) {
        var gridColumnListMap: { [gridSectionName: string]: Column[] } = {};
        spreadsheetState.columnList.forEach(column => {
            if (!gridColumnListMap[column.gridSectionName]) {
                gridColumnListMap[column.gridSectionName] = [];
            }
            gridColumnListMap[column.gridSectionName].push(column);
        });

        var gridSectionList: GridSection[] = [];
        Object.keys(gridColumnListMap).forEach(tableSectionName => {
            var gridSectionColumnList = gridColumnListMap[tableSectionName];
            gridSectionList.push({
                columnList: gridSectionColumnList,
                dataRowList: [],
                dataRowMap: {},
                name: tableSectionName,
                titleRowList: [],
                dataRowListLength: 0,
            });
        });

        gridSectionList.forEach(gridSection => {
            gridSection.columnList = gridSection.columnList.filter(gc => gc.gridSectionName === gridSection.name);

            var gridSectionColumnIdList: Array<number> = [];
            gridSection.columnList.forEach(column => {
                var columnIndex = column.startIndex;
                while (columnIndex <= column.endIndex) {
                    gridSectionColumnIdList.push(columnIndex);
                    columnIndex++;
                }
            });

            var titleRowList = this.titleGridRowListGetter.get(spreadsheetState, gridSection);
            var dataRowList = this.dataGridRowListGetter.get(spreadsheetState, gridSection, titleRowList.length);

            gridSection.titleRowList = titleRowList.map<GridRow>(row => {
                return {
                    cellList: row.cellList.filter(c => gridSectionColumnIdList.indexOf(c.columnIndex) >= 0),
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

            gridSection.dataRowList = new Array(dataRowList.length);
            gridSection.dataRowMap = {};
            var counter = 0;
            dataRowList.forEach(row => {
                var cellList = new Array(row.cellList.length);
                var index = 0;
                row.cellList.forEach(c => {
                    if (gridSectionColumnIdList.indexOf(c.columnIndex) < 0) {
                        return;
                    }
                    cellList[index] = c;
                    index++;
                });
                cellList.length = index;
                var gridRow = {
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
                gridSection.dataRowList[counter] = gridRow;
                gridSection.dataRowMap[gridRow.sectionRowIndex] = gridRow;
                counter++;
            });
            var lastRow = gridSection.dataRowList[gridSection.dataRowList.length - 1];
            var rowToRenderIndexList = this.rowToRenderIndexListGetter.getListForGridSection(spreadsheetState, gridSection);
            gridSection.visibleDataRowList = rowToRenderIndexList.map(index => gridSection.dataRowList[index]).filter(row => row != null);
            gridSection.dataRowListLength = gridSection.dataRowList.length;
        });

        return gridSectionList;
    }
}