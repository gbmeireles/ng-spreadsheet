import { Component, ElementRef, DynamicComponentLoader, Input, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { EditableComponent, GridCell, GridComponent } from 'ng-spreadsheet';

@Component({
    selector: 'InputTest',
    template: '<input #instance [value]="data" (input)="data=$event.target.value"/>',
})
export class TextEditorComponent implements EditableComponent {
    @Input() data: any = 'Init';
    @ViewChild('instance') input: ElementRef;

    constructor() {

    }

    onEditStarted(gridComponent: GridComponent, gridCell: GridCell, rowData: any) {
        if (gridCell.data == null) {
            this.data = '';
        } else {
            this.data = gridCell.data;
        }
    }

    onKeyDown(evt: KeyboardEvent) {
        var isTextSelected = this.input.nativeElement.selectionStart !== this.input.nativeElement.selectionEnd;
        switch (evt.keyCode) {
            case 37: //left
                var isStartOfInputElement = this.input.nativeElement.selectionStart === 0;
                if (!isStartOfInputElement || isTextSelected) {
                    evt.stopPropagation();
                }
                break;
            case 39: //right
                var isEndOfInputElement = this.input.nativeElement.selectionStart === this.input.nativeElement.value.length;
                if (!isEndOfInputElement || isTextSelected) {
                    evt.stopPropagation();
                }
                break;
        }
    }

    ngAfterViewInit() {
        this.input.nativeElement.select();
    }

    onEditDone(gridComponent: GridComponent, gridCell: GridCell, rowData: any) {
        gridCell.data = this.data;
        gridCell.formattedData = this.data === undefined ? '--' : this.data;
        if (gridCell.dataPathOnRowData) {
            eval(`rowData.${gridCell.dataPathOnRowData} = gridCell.data;`);
        }
    }

    onCancelEdit(gridComponent: GridComponent, gridCell: GridCell, rowData: any) {
    }
}