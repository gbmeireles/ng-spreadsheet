import {
  ElementRef,
} from '@angular/core';
import { SpreadsheetCell } from '../../model';
import { SpreadsheetComponent } from '../../spreadsheet/spreadsheet.component';

export interface ViewableComponent {
  onRowInit?: (rowData: any) => void;
  onFocus?: (rowData: any) => void;
}