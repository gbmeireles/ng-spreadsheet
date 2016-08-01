import { Injectable, provide, Provider } from '@angular/core';
import { ColumnPositionInformationMap, Column, GridColumn, GridSection, Cell } from '../Model/Model';

@Injectable()
export class SpreadsheetState {
    columnPositionInformationMap: ColumnPositionInformationMap;
    columnList: Column[];
    gridColumnList: GridColumn[];
    gridSectionList: GridSection[];
    activeCell: Cell;

    constructor(spreadsheetState?: SpreadsheetState) {
        if (spreadsheetState == null) {
            return;
        }
    }
}

export default SpreadsheetState;
export const SPREADSHEET_STATE_PROVIDERS = [provide(SpreadsheetState, { useFactory: () => { return new SpreadsheetState(); } })];