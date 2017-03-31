import { Injectable } from '@angular/core';
import { ColumnToRenderIndexListGetter } from '../Services/ColumnToRenderIndexListGetter';
import {
    SpreadsheetRow,
    SpreadsheetSectionPositionInformationMap,
    SpreadsheetSection,
} from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';
import { SpreadsheetSectionDataRowMapGetter } from './SpreadsheetSectionDataRowMapGetter';

@Injectable()
export class ColumnViewportUpdater {
    constructor(private columnToRenderIndexListGetter: ColumnToRenderIndexListGetter,
        private spreadsheetSectionDataRowMapGetter: SpreadsheetSectionDataRowMapGetter) {
    }

    update(spreadsheetState: SpreadsheetState, spreadsheetSectionName: string): SpreadsheetSection[] {
        if (spreadsheetSectionName === 'RowNumber' || spreadsheetSectionName === 'Scroll') {
            return;
        }
        var spreadsheetSectionList = spreadsheetState.spreadsheetSectionList.slice(0);
        var spreadsheetSection = spreadsheetSectionList.find(ts => ts.name === spreadsheetSectionName);
        if (!spreadsheetSection) {
            return;
        }
        var spreadsheetSectionIndex = spreadsheetSectionList.indexOf(spreadsheetSection);
        spreadsheetSection = <SpreadsheetSection>Object.assign({}, spreadsheetSection);

        var validIndexList: number[] =
            this.columnToRenderIndexListGetter.update(spreadsheetState, spreadsheetSectionName);

        spreadsheetSection.titleRowList = this.map(spreadsheetSection.titleRowList, row => {
            var result = Object.assign({}, row);
            result.visibleCellList = this.getVisibleCellList(validIndexList, result);
            return result;
        });

        spreadsheetSection.dataRowList = this.map(spreadsheetSection.dataRowList, row => {
            var result = Object.assign({}, row);
            result.visibleCellList = this.getVisibleCellList(validIndexList, result);
            return result;
        });

        spreadsheetSectionList.splice(spreadsheetSectionIndex, 1);
        spreadsheetSectionList.splice(spreadsheetSectionIndex, 0, this.spreadsheetSectionDataRowMapGetter.get(spreadsheetSection));

        return spreadsheetSectionList;
    }

    private map(array, mapFunction) {
        var arrayLen = array.length;
        var newArray = new Array(arrayLen);
        for (var i = 0; i < arrayLen; i++) {
            newArray[i] = mapFunction(array[i], i, array);
        }

        return newArray;
    }

    private getVisibleCellList(validIndexList: number[], row: SpreadsheetRow) {
        var cellToAddList = new Array(validIndexList.length);
        var index = 0;
        var lastCell;
        var length = validIndexList.length;
        for (var arrayIndex = 0; arrayIndex < length; arrayIndex++) {
            var columnIndex = validIndexList[arrayIndex];
            var cell = row.cellMap[columnIndex];
            if (cell && cell !== lastCell) {
                cellToAddList[index] = cell;
                index++;
            }
            lastCell = cell;
        }
        cellToAddList.length = index;
        return cellToAddList;
    }
}