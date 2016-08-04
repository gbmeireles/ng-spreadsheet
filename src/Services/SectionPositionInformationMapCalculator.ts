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

        if (keyList.length === 1) {
            sectionPositionInformationMap[keyList[0]].width = remainingWidth;
        } else {

            var expectedWidth = remainingWidth / keyList.length;
            keyList.forEach(key => totalUsedWidth += sectionPositionInformationMap[key].width);

            var sectionPositionInformationList = keyList.map(key => sectionPositionInformationMap[key]);
            sectionPositionInformationList.filter(p => p.width <= expectedWidth).forEach(p => remainingWidth = remainingWidth - p.width);

            var sectionWithWidthGreaterThanExpectedList =
                sectionPositionInformationList.filter(p => p.width > expectedWidth);
            if (sectionWithWidthGreaterThanExpectedList.length !== 0) {
                expectedWidth = remainingWidth / sectionWithWidthGreaterThanExpectedList.length;
                sectionWithWidthGreaterThanExpectedList.forEach(p => p.width = expectedWidth);
                sectionWithWidthGreaterThanExpectedList.forEach(p => remainingWidth = remainingWidth - p.width);
                sectionWithWidthGreaterThanExpectedList[sectionWithWidthGreaterThanExpectedList.length - 1].width += remainingWidth;
            }
        }

        var currentSectionPosition = 20;
        keyList.forEach(key => {
            sectionPositionInformationMap[key].left = currentSectionPosition;
            currentSectionPosition += sectionPositionInformationMap[key].width;
        });

        return sectionPositionInformationMap;
    }
}