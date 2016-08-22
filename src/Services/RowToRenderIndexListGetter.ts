import { Injectable } from '@angular/core';
import { RowViewportVisibleRowCountGetter } from '../Services/RowViewportVisibleRowCountGetter';
import { SpreadsheetSection } from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class RowToRenderIndexListGetter {
    private previousFirstVisibleRowIndex;
    private previousLastVisibleRowIndex;
    private rowToRenderIndexList: number[] = [];

    constructor(private rowViewportVisibleRowCountGetter: RowViewportVisibleRowCountGetter) {
    }

    getListForSpreadsheetSection(spreadsheetState: SpreadsheetState, spreadsheetSection: SpreadsheetSection): number[] {
        var rowHeight = spreadsheetState.rowHeight;
        var scrollTop = spreadsheetState.scrollTop;
        var visibleRowCount = this.rowViewportVisibleRowCountGetter.get(spreadsheetState);
        if (scrollTop < 0) {
            return this.rowToRenderIndexList;
        }
        if (rowHeight === 0) {
            return [];
        }

        var firstVisibleRowIndex = Math.floor(scrollTop / rowHeight) || 0;
        firstVisibleRowIndex = Math.max(firstVisibleRowIndex, 0);

        var lastVisibleRowIndex = visibleRowCount + firstVisibleRowIndex;

        var rowList = spreadsheetSection.dataRowList;
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

    getList(spreadsheetState: SpreadsheetState): number[] {
        var spreadsheetSection = spreadsheetState.spreadsheetSectionList[0];
        if (!spreadsheetSection) {
            return [];
        }
        return this.getListForSpreadsheetSection(spreadsheetState, spreadsheetSection);
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