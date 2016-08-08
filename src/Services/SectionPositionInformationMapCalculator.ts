import { Injectable } from '@angular/core';
import { GridSection, GridSectionPositionInformationMap } from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class SectionPositionInformationMapCalculator {
    constructor() {
    }

    calculate(spreadsheetState: SpreadsheetState): GridSectionPositionInformationMap {
        var sectionPositionInformationMap: GridSectionPositionInformationMap = {};
        var spreadsheetWidth = spreadsheetState.spreadsheetWidth;
        var totalUsedWidth = 9999999999;
        spreadsheetState.gridSectionList.forEach(gs => {
            if (!sectionPositionInformationMap[gs.name]) {
                sectionPositionInformationMap[gs.name] = {
                    left: 0,
                    width: 0,
                };
            }

            spreadsheetState.gridColumnList.filter(gc => gc.gridSectionName === gs.name).forEach(gc => {
                sectionPositionInformationMap[gc.gridSectionName].width += gc.width;
            });
        });

        var keyList = Object.keys(sectionPositionInformationMap);
        var remainingWidth = spreadsheetWidth - 40;

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