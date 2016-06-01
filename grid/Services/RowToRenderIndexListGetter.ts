import { Injectable } from '@angular/core';
import { GridSectionListManager } from '../Services/Managers/GridSectionListManager';
import { RowHeightManager } from '../Services/Managers/Managers';
import { RowViewportVisibleRowCountGetter } from '../Services/RowViewportVisibleRowCountGetter';
import { GridSection } from '../Model/Model';

@Injectable()
export class RowToRenderIndexListGetter {
    private previousFirstVisibleRowIndex;
    private previousLastVisibleRowIndex;
    private rowToRenderIndexList: number[] = [];

    constructor(private gridSectionListManager: GridSectionListManager,
        private rowHeightManager: RowHeightManager,
        private rowViewportVisibleRowCountGetter: RowViewportVisibleRowCountGetter) {
    }

    getListForGridSection(gridSection: GridSection, scrollTop: number): number[] {
        var rowHeight = this.rowHeightManager.get();
        var visibleRowCount = this.rowViewportVisibleRowCountGetter.get();
        if (scrollTop < 0) {
            return this.rowToRenderIndexList;
        }

        var firstVisibleRowIndex = Math.floor(scrollTop / rowHeight) || 0;
        firstVisibleRowIndex = Math.max(firstVisibleRowIndex, 0);

        var lastVisibleRowIndex = visibleRowCount + firstVisibleRowIndex;

        var rowList = gridSection.dataRowList;
        if (lastVisibleRowIndex > rowList.length - 1) {
            lastVisibleRowIndex = rowList.length - 1;
            firstVisibleRowIndex = Math.max(lastVisibleRowIndex - visibleRowCount - 2, 0);
        }

        if (this.previousFirstVisibleRowIndex === firstVisibleRowIndex && this.previousLastVisibleRowIndex === lastVisibleRowIndex) {
            return this.rowToRenderIndexList;
        }

        this.previousFirstVisibleRowIndex = firstVisibleRowIndex;
        this.previousLastVisibleRowIndex = lastVisibleRowIndex;

        this.rowToRenderIndexList = this.getVisibleRowIndexList(visibleRowCount, firstVisibleRowIndex, lastVisibleRowIndex);
        return this.rowToRenderIndexList;
    }

    getList(scrollTop: number): number[] {
        var gridSection = this.gridSectionListManager.get()[0];
        if (!gridSection) {
            return [];
        }
        return this.getListForGridSection(gridSection, scrollTop);
    }

    private getVisibleRowIndexList(visibleRowCount: number, firstVisibleRowIndex: number, lastVisibleRowIndex: number): number[] {
        var visibleRowIndexList = new Array(visibleRowCount);
        var index = firstVisibleRowIndex;
        var counter = 0;
        while (index <= lastVisibleRowIndex) {
            visibleRowIndexList[counter] = index;
            counter++;
            index++;
        }
        return visibleRowIndexList;
    }
}