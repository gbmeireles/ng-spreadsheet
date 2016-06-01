import { Component, ElementRef, DynamicComponentLoader, Input, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { EditableComponent, GridCell } from './Grid/Grid';

@Component({
    selector: 'InputTest',
    template: '<input #instance [value]="data" (input)="data=$event.target.value"/>',
})
export class GridTextEditorComponent implements EditableComponent {
    @Input() data: any = 'Init';
    @ViewChild('instance') input;

    constructor() {

    }

    onEditStarted(gridCell: GridCell) {
        this.data = gridCell.data;
    }

    ngAfterViewInit() {
        this.input.nativeElement.select();
    }

    onEditDone(gridCell: GridCell) {
        gridCell.data = this.data;
        gridCell.formattedData = this.data === undefined ? '--' : this.data;
    }

    onCancelEdit(gridCell: GridCell) {
    }
}