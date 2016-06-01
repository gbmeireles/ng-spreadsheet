import {
    ElementRef,
} from '@angular/core';
import {GridCell} from '../Model';
import { GridComponent } from '../../Components/Grid/GridComponent';

export interface ViewableComponent {
    onRowInit?: (gridComponent: GridComponent, gridCell: GridCell, rowData: any) => void;
    onFocus?: (gridComponent: GridComponent, gridCell: GridCell, rowData: any) => void;
}