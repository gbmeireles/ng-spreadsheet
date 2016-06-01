import { Injectable } from '@angular/core';
import { GridColumnListGetter } from '../Services/GridColumnListGetter';
import { SectionPositionInformationMapManager } from '../Services/Managers/Managers';
import { Column } from '../Model/Column';
import { GridColumn } from '../Model/GridColumn';
import { ColumnPositionInformationMap } from '../Model/ColumnPositionInformationMap';

@Injectable()
export class ColumnPositionInformationMapCalculator {
    constructor(private gridColumnListGetter: GridColumnListGetter,
        private sectionPositionInformationMapManager: SectionPositionInformationMapManager) {
    }

    calculate(columnList: Column[]): ColumnPositionInformationMap {
        var gridColumnList = this.gridColumnListGetter.get(columnList);
        var initialColumnPositionInformationMap: ColumnPositionInformationMap = this.getInitialColumnPositionInformationMap(gridColumnList);

        var columnPositionInformationMap =
            this.getColumnPositionInformationMapFilledForGridSection(gridColumnList, initialColumnPositionInformationMap);

        return columnPositionInformationMap;
    }

    private getInitialColumnPositionInformationMap(gridColumnList: GridColumn[]) {
        var currentColumnPositionBySectionMap = {};
        var columnPositionInformationMap: ColumnPositionInformationMap = {};

        gridColumnList.forEach(gridColumn => {
            if (!currentColumnPositionBySectionMap[gridColumn.gridSectionName]) {
                currentColumnPositionBySectionMap[gridColumn.gridSectionName] = 0;
            }

            columnPositionInformationMap[gridColumn.index] = {
                left: currentColumnPositionBySectionMap[gridColumn.gridSectionName],
                width: gridColumn.width,
            };
            currentColumnPositionBySectionMap[gridColumn.gridSectionName] += gridColumn.width;
        });

        return columnPositionInformationMap;
    }

    private getColumnPositionInformationMapFilledForGridSection(
        gridColumnList: GridColumn[], initialColumnPositionInformationMap: ColumnPositionInformationMap) {

        var columnPositionInformationMap: ColumnPositionInformationMap =
            this.getColumnPositionInformationMapCopy(initialColumnPositionInformationMap);
        var sectionPositionInformationMap = this.sectionPositionInformationMapManager.get();

        Object.keys(sectionPositionInformationMap).forEach(gridSectionName => {
            var gridSectionGridColumnList = gridColumnList.filter(gc => gc.gridSectionName === gridSectionName);
            var lastGridColumn = gridSectionGridColumnList[gridSectionGridColumnList.length - 1];
            var left = columnPositionInformationMap[lastGridColumn.index].left;
            var calculatedTotalWidth = left + lastGridColumn.width;

            var sectionPositionInformation = sectionPositionInformationMap[gridSectionName];
            var expectedTotalWidth = sectionPositionInformation.width;

            if (expectedTotalWidth <= calculatedTotalWidth) {
                return;
            }
            var percentToMultiply = expectedTotalWidth / calculatedTotalWidth;
            var keys = Object.keys(columnPositionInformationMap);
            var remaining = expectedTotalWidth;
            keys.forEach(key => {
                var columnIndex = parseInt(key, 10);
                var oldWidth = columnPositionInformationMap[columnIndex].width;
                var newWidth = Math.round(oldWidth * percentToMultiply);
                var widthDifference = newWidth - oldWidth;

                remaining = remaining - widthDifference;
                if (remaining < 0) {
                    newWidth = newWidth + remaining;
                }

                columnPositionInformationMap[columnIndex].width = newWidth;
            });
            if (remaining > 0) {
                columnPositionInformationMap[lastGridColumn.index].width + remaining;
            }
            var left = 0;
            gridSectionGridColumnList.forEach(gc => {
                columnPositionInformationMap[lastGridColumn.index].left = left;
                left += columnPositionInformationMap[lastGridColumn.index].width;
            });
        });

        return columnPositionInformationMap;
    }

    private getColumnPositionInformationMapCopy(columnPositionInformationMapToCopy: ColumnPositionInformationMap): ColumnPositionInformationMap {
        var columnPositionInformationMap: ColumnPositionInformationMap = {};

        Object.keys(columnPositionInformationMapToCopy).forEach(key => {
            var columnIndex = parseInt(key, 10);
            columnPositionInformationMap[columnIndex] = {
                left: columnPositionInformationMapToCopy[columnIndex].left,
                width: columnPositionInformationMapToCopy[columnIndex].width,
            };
        });

        return columnPositionInformationMap;
    }
}