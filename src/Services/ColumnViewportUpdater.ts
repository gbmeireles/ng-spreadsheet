import { Injectable } from '@angular/core';
import { ColumnToRenderIndexListGetter } from '../Services/ColumnToRenderIndexListGetter';
import {
    GridRow,
    GridSectionPositionInformationMap,
    GridSection,
} from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';
import { SpreadsheetSectionDataRowMapGetter } from './GridSectionDataRowMapGetter';

@Injectable()
export class ColumnViewportUpdater {
    constructor(private columnToRenderIndexListGetter: ColumnToRenderIndexListGetter,
        private gridSectionDataRowMapGetter: SpreadsheetSectionDataRowMapGetter) {
    }

    update(spreadsheetState: SpreadsheetState, gridSectionName: string): GridSection[] {
        if (gridSectionName === 'RowNumber' || gridSectionName === 'Scroll') {
            return;
        }
        var gridSectionList = spreadsheetState.gridSectionList.slice(0);
        var gridSection = gridSectionList.find(ts => ts.name === gridSectionName);
        if (!gridSection) {
            return;
        }
        var gridSectionIndex = gridSectionList.indexOf(gridSection);
        gridSection = <GridSection>Object.assign({}, gridSection);

        var validIndexList: number[] =
            this.columnToRenderIndexListGetter.update(spreadsheetState, gridSectionName);

        gridSection.titleRowList = gridSection.titleRowList.map(row => {
            var result = Object.assign({}, row);
            result.visibleCellList = this.getVisibleCellList(validIndexList, result);
            return result;
        });

        gridSection.dataRowList = gridSection.dataRowList.map(row => {
            var result = Object.assign({}, row);
            result.visibleCellList = this.getVisibleCellList(validIndexList, result);
            return result;
        });

        gridSectionList.splice(gridSectionIndex, 1);
        gridSectionList.splice(gridSectionIndex, 0, this.gridSectionDataRowMapGetter.get(gridSection));

        return gridSectionList;
    }

    private getVisibleCellList(validIndexList: number[], row: GridRow) {
        var cellToAddList = new Array(validIndexList.length);
        var index = 0;
        validIndexList.forEach(columnIndex => {
            var cell = row.cellMap[columnIndex];
            if (cell) {
                cellToAddList[index] = cell;
                index++;
            }
        });
        cellToAddList.length = index;
        return cellToAddList;
    }
}