import { Inject, EventEmitter, HostBinding, HostListener, Component, Input, ElementRef } from '@angular/core';
import { OnInit, OnDestroy, OnChanges } from '@angular/core';
import {
    ColumnToRenderIndexListGetter,
} from '../Services/Services';
import {
    DISPATCHER_TOKEN,
    Action,
    UpdateColumnSizeAction,
    ClearFilterAction,
} from '../Events/Events';

import {
    GridSectionPositionInformationMap,
    GridColumn,
    GridRowListMap,
    GridRow,
    Column,
    ColumnPositionInformationMap,
} from '../Model/Model';
import { Subscription } from 'rxjs/Subscription';

const css = `
:host {
    display: block;
    position: absolute;
    height: 100%;
    outline: none;
    overflow-x: hidden;
}

:host([gridSectionName="RowNumber"]) {
    width: 20px;
}`;

const html = `
<ColumnCornerCell *ngIf="gridSectionName === 'RowNumber'" [isFiltered]="isFiltered">
</ColumnCornerCell>
<ColumnRow [gridSectionName]="gridSectionName" 
    [scrollWidth]="scrollWidth"
    [visibleGridColumnList]="visibleGridColumnList" 
    [columnList]="columnList"
    [gridColumnList]="gridColumnList"
    [columnPositionInformationMap]="columnPositionInformationMap"></ColumnRow>
<ColumnResize *ngFor="let gridColumn of visibleGridColumnList"
    [gridColumn]="gridColumn"
    [columnPositionInformationMap]="columnPositionInformationMap"></ColumnResize>
<ng-content></ng-content>`;

@Component({
    selector: 'HeaderSection',
    template: html,
    styles: [css],
})
export class HeaderSectionComponent implements OnDestroy, OnInit {
    @HostBinding('style.left') left: number;
    @HostBinding('style.width') width: number;
    @Input('gridSectionScrollWidthMap') gridSectionScrollWidthMap: { [gridSectionName: string]: number };
    @Input('gridSectionName') gridSectionName: string;
    @Input('rowHeight') rowHeight: string;
    @Input('columnList') columnList: Column[];
    @Input('gridColumnList') gridColumnList: GridColumn[];
    @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
    @Input('gridSectionPositionInformationMap') gridSectionPositionInformationMap: GridSectionPositionInformationMap;
    @Input('gridSectionColumnToRendexIndexListMap') gridSectionColumnToRendexIndexListMap: { [gridSectionName: string]: number[] };
    @Input('gridSectionScrollLeftMap') gridSectionScrollLeftMap: { [gridSectionName: string]: number };

    scrollWidth: number;
    visibleGridColumnList: GridColumn[];
    isFiltered: boolean = false;

    constructor(private el: ElementRef,
        @Inject(DISPATCHER_TOKEN) private eventEmitter: EventEmitter<Action>) {
    }

    ngOnInit() {
    }

    ngOnChanges(obj) {
        if (obj['gridSectionPositionInformationMap']) {
            var gridSectionPositionInformation =
                this.gridSectionPositionInformationMap && this.gridSectionPositionInformationMap[this.gridSectionName];
            if (gridSectionPositionInformation) {
                this.left = gridSectionPositionInformation.left;
                this.width = gridSectionPositionInformation.width;
            }
        }
        if (obj['gridSectionColumnToRendexIndexListMap'] || obj['gridColumnList']) {
            var gridSectionColumnToRendexIndexList = this.gridSectionColumnToRendexIndexListMap
                && this.gridSectionColumnToRendexIndexListMap[this.gridSectionName];
            if (gridSectionColumnToRendexIndexList) {
                this.visibleGridColumnList = this.gridColumnList.filter(gc => gridSectionColumnToRendexIndexList.indexOf(gc.index) >= 0);
            }
        }
        if (obj['gridSectionScrollWidthMap']) {
            this.scrollWidth = this.gridSectionScrollWidthMap && this.gridSectionScrollWidthMap[this.gridSectionName];
        }
        if (obj['gridSectionScrollLeftMap']) {
            this.el.nativeElement.scrollLeft = this.gridSectionScrollLeftMap && this.gridSectionScrollLeftMap[this.gridSectionName];
        }
        if (obj['gridColumnList']) {
            this.isFiltered = this.gridColumnList.some(gc => gc.filterExpression && gc.filterExpression.length > 0);
        }
    }

    ngOnDestroy() {
    }
}