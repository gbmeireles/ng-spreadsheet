import { Injectable } from '@angular/core';
import {
  SpreadsheetCell,
  CellLocation,
} from '../../model';

@Injectable()
export class IsCellActiveChecker {

  constructor() { }

  check(spreadsheetCell: SpreadsheetCell, activeCellLocation: CellLocation): boolean {
    if (!spreadsheetCell || activeCellLocation == null) {
      return false;
    } else if (activeCellLocation.rowIndex !== spreadsheetCell.rowIndex) {
      return false;
    } else if (activeCellLocation.columnIndex !== spreadsheetCell.columnIndex) {
      return false;
    } else {
      return true;
    }
  }
}