import {
    ElementRef,
} from '@angular/core';
import {GridCell} from '../Model';
import { GridComponent } from '../../Components/Grid/GridComponent';

export interface EditableComponent {
    onEditStarted: (gridComponent: GridComponent, gridCell: GridCell, rowData: any) => void;
    onEditDone: (gridComponent: GridComponent, gridCell: GridCell, rowData: any) => void;
    onCancelEdit: (gridComponent: GridComponent, gridCell: GridCell, rowData: any) => void;
}