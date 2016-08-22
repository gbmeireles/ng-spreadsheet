import {
    ElementRef,
} from '@angular/core';
import { SpreadsheetCell } from '../../Model/Model';
import { SpreadsheetComponent } from '../../Spreadsheet/SpreadsheetComponent';

export interface ViewableComponent {
    onRowInit?: (rowData: any) => void;
    onFocus?: (rowData: any) => void;
}