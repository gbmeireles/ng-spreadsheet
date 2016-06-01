import { Component, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RowComponent } from '../Row/RowComponent';
import { GridRow } from '../../Model/GridRow';

@Component({
    moduleId: __moduleName,
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [RowComponent],
    selector: `GgNumberRowList`,
    templateUrl: 'NumberRowList.html',
    styleUrls: ['NumberRowList.css'],
})
export class NumberRowListComponent {
    @Input('numberRowList') numberRowList: GridRow[];
    @Input('rowHeight') rowHeight: number;

    rowIndentity(index: number, row: GridRow): any {
        return index;
    }
}