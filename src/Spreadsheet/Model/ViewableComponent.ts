import {
    ElementRef,
} from '@angular/core';
import { GridCell } from '../../Model/Model';
import { SpreadsheetComponent } from '../../Spreadsheet/SpreadsheetComponent';

export interface ViewableComponent {
    onRowInit?: (gridComponent: SpreadsheetComponent, gridCell: GridCell, rowData: any) => void;
    onFocus?: (gridComponent: SpreadsheetComponent, gridCell: GridCell, rowData: any) => void;
}