import { HostBinding, Component, Input, ElementRef, ViewChildren, Renderer } from '@angular/core';
import { OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CORE_DIRECTIVES, NgFor } from '@angular/common';
import {
    ColumnListManager,
    GridColumnListGetter,
    BodySectionScrollWidthManager,
} from '../Services/Services';
import { ColumnCellComponent } from './ColumnCell/ColumnCell';
import { Column } from '../Model/Model';
import { GridColumn } from '../Model/GridColumn';

const columnUnitList: string[] =
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const css = `
:host {
    display: block;
    position: relative;
    height: 20px;
}

GgColumnCell {
    background-color: #E6E6E6;
    border-right: 1px inset #A3A3A3;
    text-align: center;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
}`;

const html = `
<GgColumnCell *ngFor="let gridColumn of visibleGridColumnList; let columnIndex = index; trackBy:cellIndentity;" 
    [gridColumn]="gridColumn" [index]="columnIndex">
    <span>{{gridColumnIdentifierMap[gridColumn.index]}}</span>
    <span><i class="fa fa-caret-square-down"></i></span>
</GgColumnCell>`;

@Component({
    directives: [ColumnCellComponent, NgFor],
    selector: 'GgColumnRow',
    template: html,
    styles: [css],
})
export class ColumnRowComponent implements OnInit, OnDestroy, OnChanges {
    @Input('gridSectionName') gridSectionName: string;
    @HostBinding('style.height') height: number;
    @Input('visibleGridColumnList') visibleGridColumnList: GridColumn[];
    @Input('columnList') columnList: Column[];
    gridColumnIdentifierMap: { [columnIndex: number]: string } = {};

    private gridColumnList: GridColumn[];
    private unregisterScrollWidthSubscription: () => void;

    constructor(private el: ElementRef,
        private columnListManager: ColumnListManager,
        private gridColumnListGetter: GridColumnListGetter,
        private bodySectionScrollWidthManager: BodySectionScrollWidthManager,
        private renderer: Renderer) {
        this.unregisterScrollWidthSubscription = this.bodySectionScrollWidthManager.subscribe((response) => {
            if (response.gridSectionName === this.gridSectionName) {
                this.renderer.setElementStyle(this.el.nativeElement, 'minWidth', `${response.width}px`);
            }
        });
    }

    cellIndentity(index: number, cell): any {
        return index;
    }

    updateColumnIdentifierList() {
        var columnList = this.columnList || [];
        this.gridColumnIdentifierMap = {};

        var tensCount = 0;
        var unitCount = 0;
        columnList = columnList.filter(c => c.gridSectionName == this.gridSectionName);
        this.gridColumnList = this.gridColumnListGetter.get(columnList);

        this.gridColumnList.forEach(gc => {
            unitCount = gc.index % columnUnitList.length;
            tensCount = Math.floor(gc.index / columnUnitList.length);
            var columnIdentifier = '';
            if (tensCount > 0) {
                columnIdentifier = columnUnitList[tensCount];
            }
            columnIdentifier = columnIdentifier + columnUnitList[unitCount];
            this.gridColumnIdentifierMap[gc.index] = columnIdentifier;
        });
    }

    ngOnInit() {
        this.updateColumnIdentifierList();
        var width = this.bodySectionScrollWidthManager.get(this.gridSectionName);
        this.renderer.setElementStyle(this.el.nativeElement, 'minWidth', `${width}px`);
    }

    ngOnChanges(obj) {
        if (obj['columnList']) {
            this.updateColumnIdentifierList();
        }
    }

    ngOnDestroy() {
        this.unregisterScrollWidthSubscription();
    }
}