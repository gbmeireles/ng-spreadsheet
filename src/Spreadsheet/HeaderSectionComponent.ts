import { Inject, EventEmitter, HostBinding, HostListener, Component, Input, ElementRef } from '@angular/core';
import { OnInit, OnDestroy, OnChanges } from '@angular/core';
import {
    ColumnToRenderIndexListGetter,
} from '../Services/Services';
import {
    DISPATCHER_TOKEN,
    Action,
    UpdateColumnSizeAction,
    MoveColumnAction,
} from '../Events/Events';

import { ColumnRowComponent } from './ColumnRowComponent';
import { ColumnResizeComponent } from './ColumnResize/ColumnResize';
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
}

GgColumnCornerCell {
    display: block;
    position: absolute;
    width: 20px;
    background-color: #E6E6E6;
    height: 20px;
    border-bottom: 1px inset #A3A3A3;
    border-right: 1px inset #A3A3A3;
}`;

const html = `
<GgColumnCornerCell *ngIf="gridSectionName === 'RowNumber'"></GgColumnCornerCell>
<GgColumnRow [gridSectionName]="gridSectionName" 
    [scrollWidth]="scrollWidth"
    [visibleGridColumnList]="visibleGridColumnList" 
    [columnList]="columnList"
    [gridColumnList]="gridColumnList"
    [columnPositionInformationMap]="columnPositionInformationMap"></GgColumnRow>
<GgColumnResize *ngFor="let gridColumn of visibleGridColumnList"
    [gridColumn]="gridColumn"
    [columnPositionInformationMap]="columnPositionInformationMap"></GgColumnResize>
<ng-content></ng-content>`;

@Component({
    directives: [ColumnRowComponent, ColumnResizeComponent],
    selector: 'GgHeaderSection',
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
    }

    ngOnDestroy() {
    }
}