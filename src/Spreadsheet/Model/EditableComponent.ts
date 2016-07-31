import {
    ElementRef,
} from '@angular/core';
import { GridCell } from '../../Model/Model';
import { SpreadsheetComponent } from '../../Spreadsheet/SpreadsheetComponent';

export interface EditableComponent {
    onEditStarted: (gridComponent: SpreadsheetComponent, gridCell: GridCell, rowData: any) => void;
    onEditDone: (gridComponent: SpreadsheetComponent, gridCell: GridCell, rowData: any) => void;
    onCancelEdit: (gridComponent: SpreadsheetComponent, gridCell: GridCell, rowData: any) => void;
}