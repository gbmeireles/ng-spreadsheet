import { Injectable } from '@angular/core';
import { SpreadsheetSection } from '../model';
@Injectable()
export class SpreadsheetSectionDataRowMapGetter {

  constructor() { }

  get(spreadsheetSection: SpreadsheetSection): SpreadsheetSection {
    spreadsheetSection = Object.assign({}, spreadsheetSection);
    spreadsheetSection.dataRowMap = {};

    spreadsheetSection.dataRowList.forEach(spreadsheetRow => {
      spreadsheetSection.dataRowMap[spreadsheetRow.sectionRowIndex] = spreadsheetRow;
    });
    return spreadsheetSection;
  }
}