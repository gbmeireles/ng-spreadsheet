import { Injectable } from '@angular/core';
import { RowToRenderIndexListGetter } from '../Services/RowToRenderIndexListGetter';
import { GridSection } from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class RowViewportUpdater {
    constructor(private rowToRenderIndexListGetter: RowToRenderIndexListGetter) {
    }

    update(spreadsheetState: SpreadsheetState): GridSection[] {
        var visibleRowIndexList = this.rowToRenderIndexListGetter.getList(spreadsheetState);

        return spreadsheetState.gridSectionList.map(gridSection => {
            gridSection = <GridSection>Object.assign({}, gridSection);
            var rowToAddList = visibleRowIndexList.map(sectionRowIndex => gridSection.dataRowMap[sectionRowIndex]).filter(c => c != null);

            gridSection.visibleDataRowList = new Array(Math.min(visibleRowIndexList.length, rowToAddList.length));
            let counter = 0;
            rowToAddList.forEach(rowToAdd => {
                gridSection.visibleDataRowList[counter] = rowToAdd;
                counter++;
            });

            return gridSection;
        });
    }
}