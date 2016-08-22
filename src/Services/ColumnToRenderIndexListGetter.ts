import { Injectable } from '@angular/core';
import { SpreadsheetRow } from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class ColumnToRenderIndexListGetter {
    private firstVisibleCellIndex: number = 0;
    private lastVisibleCellIndex: number = 0;
    constructor() {
    }

    update(spreadsheetState: SpreadsheetState, spreadsheetSectionName: string): number[] {
        if (spreadsheetSectionName === 'RowNumber' || spreadsheetSectionName === 'Scroll') {
            return this.getValidIndexList();
        }
        var spreadsheetSectionWidth = spreadsheetState.spreadsheetSectionPositionInformationMap
            && spreadsheetState.spreadsheetSectionPositionInformationMap[spreadsheetSectionName]
            && spreadsheetState.spreadsheetSectionPositionInformationMap[spreadsheetSectionName].width;
        if (!spreadsheetSectionWidth) {
            console.error('Spreadsheet section width not available');
            return [];
        }
        var spreadsheetSection = spreadsheetState.spreadsheetSectionList.find(ts => ts.name === spreadsheetSectionName);
        if (!spreadsheetSection) {
            return this.getValidIndexList();
        }

        var spreadsheetColumnList = spreadsheetState.spreadsheetColumnList.filter(gc => gc.sectionName === spreadsheetSectionName);
        if (spreadsheetColumnList.length === 0) {
            return this.getValidIndexList();
        }

        var firstSpreadsheetColumn = spreadsheetColumnList.reduce((pv, cv) => { return pv.index < cv.index ? pv : cv; }, spreadsheetColumnList[0]);
        var lastSpreadsheetColumn = spreadsheetColumnList.reduce((pv, cv) => { return pv.index > cv.index ? pv : cv; }, spreadsheetColumnList[0]);

        var firstVisibleCellIndex = firstSpreadsheetColumn.index;
        var totalLeft = 0;
        var scrollLeft = spreadsheetState.spreadsheetSectionScrollLeftMap && spreadsheetState.spreadsheetSectionScrollLeftMap[spreadsheetSectionName];
        spreadsheetColumnList.forEach(gc => {
            totalLeft += gc.width;
            if (totalLeft >= scrollLeft) {
                return;
            }
            firstVisibleCellIndex++;
        });

        var lastVisibleCellIndex = firstVisibleCellIndex;
        var totalWidth = 0;
        spreadsheetColumnList.filter(gc => gc.index > firstVisibleCellIndex).forEach(gc => {
            totalWidth += gc.width;
            if (totalWidth >= spreadsheetSectionWidth) {
                return;
            }
            lastVisibleCellIndex++;
        });

        firstVisibleCellIndex = Math.max(firstVisibleCellIndex - 1, firstSpreadsheetColumn.index);
        lastVisibleCellIndex = Math.min(lastVisibleCellIndex + 1, lastSpreadsheetColumn.index);

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