import { Injectable } from '@angular/core';
import {
    SpreadsheetRow,
    SpreadsheetCell,
} from '../Model/Model';

interface RowCell {
    cell: SpreadsheetCell;
    row: SpreadsheetRow;
}
interface CellByColumnMapByRowMap {
    [rowIndex: number]: {
        [columnIndex: number]: RowCell
    };
}

@Injectable()
export class SpreadsheetRowspanSetter {
    set(spreadsheetRowList: SpreadsheetRow[]) {
        var rowCount = spreadsheetRowList.length;
        var list = this.getRowCellList(spreadsheetRowList);
        var cellByColumnMapByRowMap = this.getCellByColumnMapByRowMap(list);
        var maxRowIndex = spreadsheetRowList.reduce((pv, cv) => { return Math.max(cv.rowIndex, pv); }, 0);
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
                rc.cell.rowspan = rowCount - rc.row.sectionRowIndex;
            } else {
                rc.cell.rowspan = (nextRowCellInSameColumn.row.rowIndex + nextRowCellInSameColumn.cell.rowspan - 1) - rc.row.rowIndex;
            }
        });
    }

    private getRowCellList(spreadsheetRowList: SpreadsheetRow[]): RowCell[] {
        if (spreadsheetRowList.length === 0) {
            return [];
        }

        var result: RowCell[] = new Array(spreadsheetRowList.length * spreadsheetRowList[0].cellList.length);

        spreadsheetRowList = spreadsheetRowList.sort((rowA, rowB) => (rowA.rowIndex > rowB.rowIndex) ? 1 : -1);
        var counter = 0;
        spreadsheetRowList.forEach(row => {
            row.cellList.forEach(cell => {
                result[counter] = {
                    cell: cell,
                    row: row,
                };
                counter++;
            });
        });

        result.length = counter;

        return result;
    }

    private getCellByColumnMapByRowMap(rowCellList: RowCell[]): CellByColumnMapByRowMap {
        var result: CellByColumnMapByRowMap = {};
        var index = 0;
        var length = rowCellList.length;

        while (index < length) {
            var rc = rowCellList[index];
            index++;

            if (!result[rc.row.rowIndex]) {
                result[rc.row.rowIndex] = {};
            }
            result[rc.row.rowIndex][rc.cell.columnIndex] = rc;
        }

        return result;
    }
}