import { Component, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { OnChanges, SimpleChange } from '@angular/core';
import { RowComponent } from './Row/RowComponent';
import { CellComponent } from './Cell/CellComponent';
import {
    RowViewportVisibleRowCountGetter,
    BodySectionScrollManager,
} from '../../Services/Services';
import { GridRow } from '../../Model/GridRow';
import { GridCell } from '../../Model/GridCell';

@Component({
    moduleId: __moduleName,
    changeDetection: ChangeDetectionStrategy.Default,
    directives: [RowComponent, CellComponent],
    selector: `GgRowList`,
    templateUrl: 'RowList.html',
})
export class RowListComponent {
    @Input('rowList') rowList: GridRow[];
    @Input('gridSectionName') gridSectionName: string;

    constructor(private rowViewportVisibleRowCountGetter: RowViewportVisibleRowCountGetter,
        private bodySectionScrollManager: BodySectionScrollManager,
        private cdr: ChangeDetectorRef) {
        this.bodySectionScrollManager.subscribe((param) => {
            if (param.gridSectionName === this.gridSectionName) {
                this.cdr.markForCheck();
            }
        });
    }

    rowIndentity(index: number, row: GridRow): any {
        return index;
    }

    cellIdentity(index: number, cell: GridCell): any {
        return index;
    }
}