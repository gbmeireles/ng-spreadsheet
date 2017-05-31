import { Injectable } from '@angular/core';
import { SpreadsheetColumn } from '../model/spreadsheet-column';
import { ColumnPositionInformationMap } from '../model/column-position-information-map';

@Injectable()
export class ColumnPositionInformationMapCalculator {
  constructor() {
  }

  calculate(spreadsheetColumnList: SpreadsheetColumn[]): ColumnPositionInformationMap {
    var initialColumnPositionInformationMap: ColumnPositionInformationMap = this.getInitialColumnPositionInformationMap(spreadsheetColumnList);

    return initialColumnPositionInformationMap;
  }

  private getInitialColumnPositionInformationMap(spreadsheetColumnList: SpreadsheetColumn[]) {
    var currentColumnPositionBySectionMap = {};
    var columnPositionInformationMap: ColumnPositionInformationMap = {};

    spreadsheetColumnList.forEach(spreadsheetColumn => {
      if (!currentColumnPositionBySectionMap[spreadsheetColumn.sectionName]) {
        currentColumnPositionBySectionMap[spreadsheetColumn.sectionName] = 0;
      }

      columnPositionInformationMap[spreadsheetColumn.index] = {
        left: currentColumnPositionBySectionMap[spreadsheetColumn.sectionName],
        width: spreadsheetColumn.width,
      };
      currentColumnPositionBySectionMap[spreadsheetColumn.sectionName] += spreadsheetColumn.width;
    });

    return columnPositionInformationMap;
  }
}