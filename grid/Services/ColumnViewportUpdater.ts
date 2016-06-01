import { Injectable } from '@angular/core';
import {
    ColumnListManager,
    GridSectionListManager,
    BodySectionScrollManager,
    SectionPositionInformationMapManager,
} from '../Services/Managers/Managers';
import { ColumnToRenderIndexListGetter } from '../Services/ColumnToRenderIndexListGetter';
import { GridRow } from '../Model/Model';

@Injectable()
export class ColumnViewportUpdater {
    constructor(private gridSectionListManager: GridSectionListManager,
        private bodySectionScrollManager: BodySectionScrollManager,
        private sectionPositionInformationMapManager: SectionPositionInformationMapManager,
        private columnToRenderIndexListGetter: ColumnToRenderIndexListGetter) {
    }

    init() {
        this.bodySectionScrollManager.subscribe((response: { gridSectionName: string, scrollLeft: number }) => {
            this.update(response);
        });

        this.sectionPositionInformationMapManager.subscribe((spim: SectionPositionInformationMap) => {
            Object.keys(gridSectionName => {
                var scrollLeft = this.bodySectionScrollManager.get(gridSectionName);
                this.update({ gridSectionName: gridSectionName, scrollLeft: scrollLeft });
            });
        });
    }

    update(response: { gridSectionName: string, scrollLeft: number }) {
        if (response.gridSectionName === 'RowNumber' || response.gridSectionName === 'Scroll') {
            return;
        }
        var gridSection = this.gridSectionListManager.get().find(ts => ts.name === response.gridSectionName);
        if (!gridSection) {
            return;
        }
        var validIndexList: number[] = this.columnToRenderIndexListGetter.update(response.gridSectionName, response.scrollLeft);

        gridSection.titleRowList.forEach(row => {
            row.visibleCellList = this.getVisibleCellList(validIndexList, row);
        });

        gridSection.dataRowList.forEach(row => {
            row.visibleCellList = this.getVisibleCellList(validIndexList, row);
        });
    }

    private getVisibleCellList(validIndexList: number[], row: GridRow) {
        var cellToAddList = validIndexList.map(columnIndex => row.cellMap[columnIndex]);
        cellToAddList = cellToAddList.filter(c => c != null);
        return cellToAddList;
    }
}