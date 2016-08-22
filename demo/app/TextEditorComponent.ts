import { Component, ElementRef, DynamicComponentLoader, Input, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { EditableComponent, SpreadsheetCell } from 'ng-spreadsheet';

@Component({
    selector: 'InputTest',
    template: '<input #instance [value]="data" (input)="data=$event.target.value"/>',
})
export class TextEditorComponent implements EditableComponent {
    @Input() data: any = 'Init';
    @ViewChild('instance') input: ElementRef;

    constructor(private spreadsheetCell: SpreadsheetCell) {

    }

    onEditStarted(rowData: any) {
        if (this.spreadsheetCell.data == null) {
            this.data = '';
        } else {
            this.data = this.spreadsheetCell.data;
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

    onEditDone(rowData: any) {
        this.spreadsheetCell.data = this.data;
    }

    onCancelEdit(rowData: any) {
    }
}