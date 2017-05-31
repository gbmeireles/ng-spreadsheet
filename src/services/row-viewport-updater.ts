import { Injectable } from '@angular/core';
import { RowToRenderIndexListGetter } from '../services/row-to-render-index-list-getter';
import { SpreadsheetSection } from '../model/model';
import { SpreadsheetState } from '../spreadsheet/spreadsheet-state';

@Injectable()
export class RowViewportUpdater {
    constructor(private rowToRenderIndexListGetter: RowToRenderIndexListGetter) {
    }

    update(spreadsheetState: SpreadsheetState): SpreadsheetSection[] {
        var visibleRowIndexList = this.rowToRenderIndexListGetter.getList(spreadsheetState);

        return spreadsheetState.spreadsheetSectionList.map(spreadsheetSection => {
            spreadsheetSection = <SpreadsheetSection>Object.assign({}, spreadsheetSection);
            var rowToAddList = visibleRowIndexList.map(sectionRowIndex => spreadsheetSection.dataRowMap[sectionRowIndex]).filter(c => c != null);

            spreadsheetSection.visibleDataRowList = new Array(Math.min(visibleRowIndexList.length, rowToAddList.length));
            let counter = 0;
            rowToAddList.forEach(rowToAdd => {
                spreadsheetSection.visibleDataRowList[counter] = rowToAdd;
                counter++;
            });

            return spreadsheetSection;
        });
    }
}