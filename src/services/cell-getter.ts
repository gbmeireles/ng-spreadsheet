import { Injectable } from '@angular/core';
import { CellManager } from './cell-manager';
import { Cell, CellLocation } from '../model';

@Injectable()
export class CellGetter {
  constructor(private cellManager: CellManager) {

  }

  get(cellLocation: CellLocation): Cell {
    var cellList = this.cellManager.getCellListBySpreadsheetColumnIndex(cellLocation.columnIndex);
    return cellList.find(cell => cell.spreadsheetCell && cell.spreadsheetCell.rowIndex === cellLocation.rowIndex);
  }
}