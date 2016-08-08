import { Injectable } from '@angular/core';
import { GridColumn } from '../Model/GridColumn';
import { ColumnPositionInformationMap } from '../Model/ColumnPositionInformationMap';

@Injectable()
export class ColumnPositionInformationMapCalculator {
    constructor() {
    }

    calculate(gridColumnList: GridColumn[]): ColumnPositionInformationMap {
        var initialColumnPositionInformationMap: ColumnPositionInformationMap = this.getInitialColumnPositionInformationMap(gridColumnList);

        return initialColumnPositionInformationMap;
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
}