import {
    ElementRef,
} from '@angular/core';

export interface EditableComponent {
    onEditStarted: (rowData: any) => void;
    onEditDone: (rowData: any) => void;
    onCancelEdit: (rowData: any) => void;
}