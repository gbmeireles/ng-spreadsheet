import { Injectable } from '@angular/core';
import { GridRow } from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class ColumnToRenderIndexListGetter {
    private firstVisibleCellIndex: number = 0;
    private lastVisibleCellIndex: number = 0;
    constructor() {
    }

    update(spreadsheetState: SpreadsheetState, gridSectionName: string): number[] {
        if (gridSectionName === 'RowNumber' || gridSectionName === 'Scroll') {
            return this.getValidIndexList();
        }
        var gridSectionWidth = spreadsheetState.gridSectionPositionInformationMap
            && spreadsheetState.gridSectionPositionInformationMap[gridSectionName]
            && spreadsheetState.gridSectionPositionInformationMap[gridSectionName].width;
        if (!gridSectionWidth) {
            console.error('Grid section width not available');
            return [];
        }
        var gridSection = spreadsheetState.gridSectionList.find(ts => ts.name === gridSectionName);
        if (!gridSection) {
            return this.getValidIndexList();
        }

        var gridColumnList = spreadsheetState.gridColumnList.filter(gc => gc.gridSectionName === gridSectionName);
        if (gridColumnList.length === 0) {
            return this.getValidIndexList();
        }

        var firstGridColumn = gridColumnList.reduce((pv, cv) => { return pv.index < cv.index ? pv : cv; }, gridColumnList[0]);
        var lastGridColumn = gridColumnList.reduce((pv, cv) => { return pv.index > cv.index ? pv : cv; }, gridColumnList[0]);

        var firstVisibleCellIndex = firstGridColumn.index;
        var totalLeft = 0;
        var scrollLeft = spreadsheetState.gridSectionScrollLeftMap && spreadsheetState.gridSectionScrollLeftMap[gridSectionName];
        gridColumnList.forEach(gc => {
            totalLeft += gc.width;
            if (totalLeft >= scrollLeft) {
                return;
            }
            firstVisibleCellIndex++;
        });

        var lastVisibleCellIndex = firstVisibleCellIndex;
        var totalWidth = 0;
        gridColumnList.filter(gc => gc.index > firstVisibleCellIndex).forEach(gc => {
            totalWidth += gc.width;
            if (totalWidth >= gridSectionWidth) {
                return;
            }
            lastVisibleCellIndex++;
        });

        firstVisibleCellIndex = Math.max(firstVisibleCellIndex - 1, firstGridColumn.index);
        lastVisibleCellIndex = Math.min(lastVisibleCellIndex + 1, lastGridColumn.index);

        if (this.firstVisibleCellIndex === firstVisibleCellIndex && this.lastVisibleCellIndex === lastVisibleCellIndex) {
            return this.getValidIndexList();
        }

        this.firstVisibleCellIndex = firstVisibleCellIndex;
        this.lastVisibleCellIndex = lastVisibleCellIndex;

        return this.getValidIndexList();
    }

    private getValidIndexList(): number[] {
        var validIndexList: number[] = [];
        var validIndex = this.firstVisibleCellIndex;
        while (validIndex <= this.lastVisibleCellIndex) {
            validIndexList.push(validIndex);
            validIndex++;
        }
        return validIndexList;
    }
}