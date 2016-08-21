import { Injectable } from '@angular/core';
import {
    GridRow,
    GridCell,
} from '../Model/Model';

interface RowCell {
    cell: GridCell;
    row: GridRow;
}
interface CellByColumnMapByRowMap {
    [rowIndex: number]: {
        [columnIndex: number]: RowCell
    };
}

@Injectable()
export class SpreadsheetRowspanSetter {
    set(gridRowList: GridRow[]) {
        var rowCount = gridRowList.length;
        var list = this.getRowCellList(gridRowList);
        var cellByColumnMapByRowMap = this.getCellByColumnMapByRowMap(list);
        var maxRowIndex = gridRowList.reduce((pv, cv) => { return Math.max(cv.rowIndex, pv); }, 0);
        list.forEach(rc => {
            var nextRowCellInSameColumn = rc;
            var rowIndex = rc.row.rowIndex + 1;
            while (rowIndex <= maxRowIndex) {
                if (!cellByColumnMapByRowMap[rowIndex]) {
                    rowIndex++;
                    continue;
                }

                var cellByColumnMap = cellByColumnMapByRowMap[rowIndex];
                var columnIndex = rc.cell.columnIndex;

                while (columnIndex >= 0) {
                    if (!cellByColumnMap[columnIndex]) {
                        columnIndex--;
                        continue;
                    }

                    var result = cellByColumnMap[columnIndex];

                    var maxAffectedColumnIndex = result.cell.columnIndex + result.cell.colspan - 1;
                    if (columnIndex < rc.cell.columnIndex && maxAffectedColumnIndex < rc.cell.columnIndex) {
                        break;
                    }

                    if (maxAffectedColumnIndex >= rc.cell.columnIndex) {
                        nextRowCellInSameColumn = result;
                        break;
                    }
                    columnIndex--;
                }
                if (nextRowCellInSameColumn != rc) {
                    break;
                }
                rowIndex++;
            }

            if (nextRowCellInSameColumn == rc) {
                rc.cell.rowspan = rowCount - rc.row.rowIndex;
            } else {
                rc.cell.rowspan = (nextRowCellInSameColumn.row.rowIndex + nextRowCellInSameColumn.cell.rowspan - 1) - rc.row.rowIndex;
            }
        });
    }

    private getRowCellList(gridRowList: GridRow[]): RowCell[] {
        if (gridRowList.length === 0) {
            return [];
        }

        var result: RowCell[] = new Array(gridRowList.length * gridRowList[0].cellList.length);

        gridRowList = gridRowList.sort((rowA, rowB) => (rowA.rowIndex > rowB.rowIndex) ? 1 : -1);
        var counter = 0;
        gridRowList.forEach(row => {
            row.cellList.forEach(cell => {
                result[counter] = {
                    cell: cell,
                    row: row,
                };
            });
            counter++;
        });

        return result;
    }

    private getCellByColumnMapByRowMap(rowCellList: RowCell[]): CellByColumnMapByRowMap {
        var result: CellByColumnMapByRowMap = {};

        rowCellList.forEach(rc => {
            if (!result[rc.row.rowIndex]) {
                result[rc.row.rowIndex] = {};
            }
            result[rc.row.rowIndex][rc.cell.columnIndex] = rc;
        });

        return result;
    }
}