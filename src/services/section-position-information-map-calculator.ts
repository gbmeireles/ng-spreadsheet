import { Injectable } from '@angular/core';
import { SpreadsheetSection, SpreadsheetSectionPositionInformationMap } from '../model/model';
import { SpreadsheetState } from '../spreadsheet/spreadsheet-state';

@Injectable()
export class SectionPositionInformationMapCalculator {
    constructor() {
    }

    calculate(spreadsheetState: SpreadsheetState): SpreadsheetSectionPositionInformationMap {
        var sectionPositionInformationMap: SpreadsheetSectionPositionInformationMap = {};
        var spreadsheetWidth = spreadsheetState.spreadsheetWidth;
        var totalUsedWidth = 9999999999;
        spreadsheetState.spreadsheetSectionList.forEach(gs => {
            if (!sectionPositionInformationMap[gs.name]) {
                sectionPositionInformationMap[gs.name] = {
                    left: 0,
                    width: 0,
                };
            }

            spreadsheetState.spreadsheetColumnList.filter(gc => gc.sectionName === gs.name).forEach(gc => {
                sectionPositionInformationMap[gc.sectionName].width += gc.width;
            });
        });

        var sectionNameList = Object.keys(sectionPositionInformationMap);
        var remainingWidth = spreadsheetWidth - 40;

        if (sectionNameList.length === 1) {
            sectionPositionInformationMap[sectionNameList[0]].width = remainingWidth;
        } else {

            var expectedWidth = remainingWidth / sectionNameList.length;
            sectionNameList.forEach(key => totalUsedWidth += sectionPositionInformationMap[key].width);

            var sectionPositionInformationList = sectionNameList.map(key => sectionPositionInformationMap[key]);
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
        sectionNameList.forEach(key => {
            sectionPositionInformationMap[key].left = currentSectionPosition;
            currentSectionPosition += sectionPositionInformationMap[key].width;
        });

        return sectionPositionInformationMap;
    }
}