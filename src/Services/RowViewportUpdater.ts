import { Injectable } from '@angular/core';
import { GridSectionListManager } from '../Services/Managers/GridSectionListManager';
import { RowToRenderIndexListGetter } from '../Services/RowToRenderIndexListGetter';
import { GridSection } from '../Model/Model';

@Injectable()
export class RowViewportUpdater {
    constructor(private gridSectionListManager: GridSectionListManager,
        private rowToRenderIndexListGetter: RowToRenderIndexListGetter) {
    }

    update(scrollTop: number) {
        var visibleRowIndexList = this.rowToRenderIndexListGetter.getList(scrollTop);

        this.gridSectionListManager.get().forEach(gridSection => {
            var rowToAddList = visibleRowIndexList.map(sectionRowIndex => gridSection.dataRowMap[sectionRowIndex]).filter(c => c != null);

            gridSection.visibleDataRowList = new Array(Math.min(visibleRowIndexList.length, rowToAddList.length));
            let counter = 0;
            rowToAddList.forEach(rowToAdd => {
                gridSection.visibleDataRowList[counter] = rowToAdd;
                counter++;
            });
        });
    }
}