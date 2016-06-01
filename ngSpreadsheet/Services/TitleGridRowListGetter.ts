import { Injectable } from '@angular/core';
import { GridRowspanSetter } from '../Services/GridRowspanSetter';
import {
    GridData,
    GridRow,
    ColumnDefinition,
    ContentTypeEnum,
} from '../Model/Model';

@Injectable()
export class TitleGridRowListGetter {
    constructor(private gridRowRowspanSetter: GridRowspanSetter) {

    }

    get(gridData: GridData, gridColumnList: Column[]): GridRow[] {
        var result: GridRow[] = [];
        var columnListMap: { [tableSection: string]: ColumnDefinition[] } = {};
        gridData.columnDefinitionList.forEach(c => {
            if (!columnListMap[c.gridSection]) {
                columnListMap[c.gridSection] = [];
            }
            columnListMap[c.gridSection].push(c);
        });
        gridColumnList.forEach(gridColumn => {
            var indexOfColumn = gridColumnList.indexOf(gridColumn);
            var column = columnListMap[gridColumn.gridSectionName][indexOfColumn];

            var titleCellMatrix = column.getTitleCellMatrix(gridData, gridColumn);
            for (var i = 0; i < titleCellMatrix.length; i++) {
                var row: GridRow = null;
                if (result.length >= i + 1) {
                    row = result[i];
                }
                if (row == null) {
                    row = {
                        cellList: [],
                        height: gridData.rowHeight,
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
            row.visibleCellList = row.cellList.slice(0, 20);
            var lastCell = row.cellList[row.cellList.length - 1];
            if (row.visibleCellList.indexOf(lastCell) < 0) {
                row.visibleCellList.push(lastCell);
            }
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