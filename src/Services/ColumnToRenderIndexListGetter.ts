import { Injectable } from '@angular/core';
import {
    BodySectionWidthManager,
    ColumnListManager,
    GridSectionListManager,
    BodySectionScrollManager,
    BodyWidthManager,
    SectionPositionInformationMapManager,
} from '../Services/Managers/Managers';
import { GridColumnListGetter } from '../Services/GridColumnListGetter';
import { GridRow } from '../Model/Model';

@Injectable()
export class ColumnToRenderIndexListGetter {
    private firstVisibleCellIndex: number = 0;
    private lastVisibleCellIndex: number = 0;
    constructor(private bodySectionWidthManager: BodySectionWidthManager,
        private columnListManager: ColumnListManager,
        private gridColumnListGetter: GridColumnListGetter,
        private gridSectionListManager: GridSectionListManager,
        private bodySectionScrollManager: BodySectionScrollManager,
        private bodyWidthManager: BodyWidthManager,
        private sectionPositionInformationMapManager: SectionPositionInformationMapManager) {
    }

    update(gridSectionName: string, scrollLeft: number) {
        if (gridSectionName === 'RowNumber' || gridSectionName === 'Scroll') {
            return this.getValidIndexList();
        }
        var gridSectionWidth = this.sectionPositionInformationMapManager.get()[gridSectionName].width;
        if (!gridSectionWidth) {
            throw 'Grid section width not available';
        }
        var gridSection = this.gridSectionListManager.get().find(ts => ts.name === gridSectionName);
        if (!gridSection) {
            return this.getValidIndexList();
        }

        var gridColumnList = this.gridColumnListGetter.get(this.columnListManager.get())
            .filter(gc => gc.gridSectionName === gridSectionName);
        if (gridColumnList.length === 0) {
            return this.getValidIndexList();
        }

        var firstGridColumn = gridColumnList.reduce((pv, cv) => { return pv.index < cv.index ? pv : cv; }, gridColumnList[0]);
        var lastGridColumn = gridColumnList.reduce((pv, cv) => { return pv.index > cv.index ? pv : cv; }, gridColumnList[0]);

        var firstVisibleCellIndex = firstGridColumn.index;
        var totalLeft = 0;
        gridColumnList.forEach(gc => {
            totalLeft += gc.width;
            if (totalLeft >= scrollLeft) {
                return;
            }
            firstVisibleCellIndex++;
        });

        var lastVisibleCellIndex = firstVisibleCellIndex;
        var totalWidth = 0;
        gridColumnList.filter(gc => gc.index >= firstVisibleCellIndex).forEach(gc => {
            totalWidth += gc.width;
            if (totalWidth >= gridSectionWidth) {
                return;
            }
            lastVisibleCellIndex++;
        });

        var visibleCellCount = 3;

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