import { Injectable } from '@angular/core';
import { Cell, SpreadsheetColumn } from '../model';

@Injectable()
export class CellManager {
  private cellList: Cell[] = [];
  constructor() {

  }

  getCellList() {
    return this.cellList.slice(0);
  }

  getCellListBySpreadsheetColumnIndex(spreadsheetColumnIndex: number) {
    return this.cellList.filter(c => c.spreadsheetColumnIndex === spreadsheetColumnIndex);
  }

  getCellByPosition(spreadsheetColumnIndex: number, rowNumberIndex: number): Cell {
    return this.cellList.find(c => c.spreadsheetColumnIndex === spreadsheetColumnIndex && c.spreadsheetCell.rowIndex === rowNumberIndex);
  }

  addCell(cell: Cell) {
    this.cellList.push(cell);
  }

  removeCell(cell: Cell) {
    var index = this.cellList.indexOf(cell);
    if (index < 0) {
      return;
    }
    this.cellList.splice(index, 1);
  }
}