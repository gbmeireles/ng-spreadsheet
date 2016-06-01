import { Injectable } from '@angular/core';
import {
    GridRow,
    GridData,
    GridSection,
    Column,
} from '../Model/Model';
import { TitleGridRowListGetter } from '../Services/TitleGridRowListGetter';
import { DataGridRowListGetter } from '../Services/DataGridRowListGetter';
import { RowViewportVisibleRowCountGetter } from '../Services/RowViewportVisibleRowCountGetter';
import { RowToRenderIndexListGetter } from '../Services/RowToRenderIndexListGetter';
import { BodyScrollManager } from '../Services/Managers/BodyScrollManager';

@Injectable()
export class GridSectionListGetter {
    constructor(private titleGridRowListGetter: TitleGridRowListGetter,
        private dataGridRowListGetter: DataGridRowListGetter,
        private rowToRenderIndexListGetter: RowToRenderIndexListGetter,
        private bodyScrollManager: BodyScrollManager) {
    }

    get(gridData: GridData, gridColumnList: Column[]) {
        var gridColumnListMap = {};
        gridColumnList.forEach(gridColumn => {
            if (!gridColumnListMap[gridColumn.gridSectionName]) {
                gridColumnListMap[gridColumn.gridSectionName] = [];
            }
            gridColumnListMap[gridColumn.gridSectionName].push(gridColumn);
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
            });
        });

        gridSectionList.forEach(gridSection => {
            gridSection.columnList = gridSection.columnList.filter(gc => gc.gridSectionName === gridSection.name);

            var gridSectionColumnIdList: Array<number> = [];
            gridSection.columnList.forEach(gridColumn => {
                var columnIndex = gridColumn.startIndex;
                while (columnIndex <= gridColumn.endIndex) {
                    gridSectionColumnIdList.push(columnIndex);
                    columnIndex++;
                }
            });

            var titleRowList = this.titleGridRowListGetter.get(gridData, gridSection.columnList);
            var dataRowList = this.dataGridRowListGetter.get(gridData, gridSection.columnList, titleRowList.length);

            gridSection.titleRowList = titleRowList.map<GridRow>(row => {
                return {
                    cellList: row.cellList.filter(c => gridSectionColumnIdList.indexOf(c.columnIndex) >= 0),
                    cellMap: row.cellMap,
                    height: gridData.rowHeight,
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
                var gridRow = {
                    cellList: row.cellList.filter(c => gridSectionColumnIdList.indexOf(c.columnIndex) >= 0),
                    cellMap: row.cellMap,
                    height: gridData.rowHeight,
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
            var rowToRenderIndexList = this.rowToRenderIndexListGetter.getListForGridSection(gridSection, this.bodyScrollManager.get());
            gridSection.visibleDataRowList = rowToRenderIndexList.map(index => gridSection.dataRowList[index]).filter(row => row != null);
        });

        return gridSectionList;
    }
}