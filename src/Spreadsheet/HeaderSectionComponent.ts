import { HostBinding, HostListener, Component, Input, ElementRef } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import {
    SectionPositionInformationMapManager,
    ColumnPositionInformationMapManager,
    BodySectionScrollManager,
    RowHeightManager,
    ColumnListManager,
    GridColumnListGetter,
    ColumnToRenderIndexListGetter,
} from '../Services/Services';

import { ColumnRowComponent } from './ColumnRowComponent';
import { ColumnResizeComponent } from './ColumnResize/ColumnResize';
import { GridRow } from '../Model/GridRow';
import { GridData } from '../Model/GridData';
import { GridRowListMap } from '../Model/GridRowListMap';
import { GridColumn } from '../Model/GridColumn';
import { SectionPositionInformationMap } from '../Model/SectionPositionInformationMap';

const html = `
<GgColumnCornerCell *ngIf="gridSectionName === 'RowNumber'"></GgColumnCornerCell>
<GgColumnRow [gridSectionName]="gridSectionName" [visibleGridColumnList]="visibleGridColumnList"></GgColumnRow>
<GgColumnResize [gridColumn]="gridColumn" *ngFor="let gridColumn of visibleGridColumnList"></GgColumnResize>
<ng-content></ng-content>`;

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

@Component({
    directives: [ColumnRowComponent, ColumnResizeComponent],
    selector: 'GgHeaderSection',
    template: html,
    styles: [css],
})
export class HeaderSectionComponent implements OnDestroy, OnInit {
    @HostBinding('style.left') left: number;
    @HostBinding('style.width') width: number;
    @Input('gridSectionName') gridSectionName: string;
    visibleGridColumnList: GridColumn[] = [];
    columnToRenderIndexList: number[];

    private isInitialized: boolean = false;
    private unregisterBodySectionScrollSubscription: () => void;
    private unregisterSectionPositionInformationMapSubscription: () => void;
    private unregisterColumnPositionInformationMapSubscription: () => void;

    constructor(private el: ElementRef,
        private bodySectionScrollManager: BodySectionScrollManager,
        private sectionPositionInformationMapManager: SectionPositionInformationMapManager,
        private rowHeightManager: RowHeightManager,
        private columnListManager: ColumnListManager,
        private gridColumnListGetter: GridColumnListGetter,
        private columnToRenderIndexListGetter: ColumnToRenderIndexListGetter,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager) {
        this.subscribeToChanges();
    }

    ngOnInit() {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;
        this.updateSectionPosition();
        this.updateVisibleGridColumnList();
    }

    ngOnDestroy() {
    }

    private subscribeToChanges() {
        this.unregisterSectionPositionInformationMapSubscription =
            this.sectionPositionInformationMapManager.subscribe((sectionPositionInformationMap: SectionPositionInformationMap) => {
                this.updateSectionPosition();
            });
        this.unregisterBodySectionScrollSubscription = this.bodySectionScrollManager.subscribe((obj) => {
            if (obj.gridSectionName === this.gridSectionName) {
                this.el.nativeElement.scrollLeft = obj.scrollLeft;
                this.updateVisibleGridColumnList();
            }
        });
        this.unregisterColumnPositionInformationMapSubscription =
            this.columnPositionInformationMapManager.subscribe(() => this.updateVisibleGridColumnList());
    }

    private unsubscribeToChanges() {
        this.unregisterBodySectionScrollSubscription();
        this.unregisterSectionPositionInformationMapSubscription();
        this.unregisterColumnPositionInformationMapSubscription();
    }

    private updateSectionPosition() {
        var sectionPositionInformationMap = this.sectionPositionInformationMapManager.get();
        var sectionPositionInformation = sectionPositionInformationMap[this.gridSectionName];
        if (!sectionPositionInformation) {
            return;
        }
        this.left = sectionPositionInformation.left;
        this.width = sectionPositionInformation.width;
    }

    private updateVisibleGridColumnList() {
        var columnList = this.columnListManager.get().filter(gc => gc.gridSectionName == this.gridSectionName);
        var columnToRenderIndexList = this.columnToRenderIndexListGetter.update(this.gridSectionName, this.el.nativeElement.scrollLeft);
        this.visibleGridColumnList = this.gridColumnListGetter.get(columnList).filter(gc => columnToRenderIndexList.indexOf(gc.index) >= 0);
    }
}