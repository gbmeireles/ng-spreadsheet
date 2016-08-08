import {
    ElementRef,
} from '@angular/core';
import { GridCell } from '../../Model/Model';
import { SpreadsheetComponent } from '../../Spreadsheet/SpreadsheetComponent';

export interface ViewableComponent {
    onRowInit?: (rowData: any) => void;
    onFocus?: (rowData: any) => void;
}