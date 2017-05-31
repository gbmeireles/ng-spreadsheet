import { Injectable } from '@angular/core';
import { SpreadsheetSection } from '../model/model';
@Injectable()
export class SpreadsheetSectionDataRowMapGetter {

    constructor() { }

    get(spreadsheetSection: SpreadsheetSection): SpreadsheetSection {
        spreadsheetSection = Object.assign({}, spreadsheetSection);
        spreadsheetSection.dataRowMap = {};
        var counter = 0;
        spreadsheetSection.dataRowList.forEach(spreadsheetRow => {
            spreadsheetSection.dataRowMap[spreadsheetRow.sectionRowIndex] = spreadsheetRow;
        });
        return spreadsheetSection;
    }
}