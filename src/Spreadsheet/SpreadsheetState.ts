import { Injectable, provide, Provider } from '@angular/core';
import { ColumnDefinition, Column, GridColumn, GridSection, Cell } from '../Model/Model';

@Injectable()
export class SpreadsheetState {
    columnDefinitionList: ColumnDefinition[];
    columnList: Column[];
    gridColumnList: GridColumn[];

    constructor(spreadsheetState?: SpreadsheetState) {
        if (spreadsheetState == null) {
            return;
        }
    }
}

export default SpreadsheetState;
export const SPREADSHEET_STATE_PROVIDERS = [provide(SpreadsheetState, { useFactory: () => { return new SpreadsheetState(); } })];