import { Injectable } from '@angular/core';
import { BodyWidthManager } from '../Services/Managers/Managers';
import { GridColumnListGetter } from '../Services/GridColumnListGetter';
import { GridSection, SectionPositionInformationMap } from '../Model/Model';

@Injectable()
export class SectionPositionInformationMapCalculator {
    constructor(private bodyWidthManager: BodyWidthManager,
        private gridColumnListGetter: GridColumnListGetter) {
    }

    calculate(gridSectionList: GridSection[]): SectionPositionInformationMap {
        var sectionPositionInformationMap: SectionPositionInformationMap = {};
        var bodyWidth = this.bodyWidthManager.get();
        var totalUsedWidth = 9999999999;
        gridSectionList.forEach(gridSection => {
            if (!sectionPositionInformationMap[gridSection.name]) {
                sectionPositionInformationMap[gridSection.name] = {
                    left: 0,
                    width: 0,
                };
            }

            this.gridColumnListGetter.get(gridSection.columnList).forEach(gridColumn => {
                sectionPositionInformationMap[gridColumn.gridSectionName].width += gridColumn.width;
            });
        });

        var keyList = Object.keys(sectionPositionInformationMap);
        var remainingWidth = bodyWidth - 40;
        var expectedWidth = remainingWidth / keyList.length;
        keyList.forEach(key => totalUsedWidth += sectionPositionInformationMap[key].width);

        keyList.map(key => sectionPositionInformationMap[key])
            .filter(p => p.width <= expectedWidth).forEach(p => remainingWidth = remainingWidth - p.width);

        expectedWidth = remainingWidth / keyList.map(key => sectionPositionInformationMap[key]).filter(p => p.width > expectedWidth).length;
        keyList.map(key => sectionPositionInformationMap[key]).filter(p => p.width > expectedWidth).forEach(p => p.width = expectedWidth);

        var currentSectionPosition = 20;
        keyList.forEach(key => {
            sectionPositionInformationMap[key].left = currentSectionPosition;
            currentSectionPosition += sectionPositionInformationMap[key].width;
        });

        return sectionPositionInformationMap;
    }
}