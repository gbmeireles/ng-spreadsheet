import { Injectable, provide, Provider } from '@angular/core';
import {
    GridSectionPositionInformationMap,
    ColumnPositionInformationMap,
    ColumnDefinition,
    Column,
    GridColumn,
    GridSection,
    Cell,
    GridRow,
    ContentTypeEnum,
    CellLocation,
} from '../Model/Model';

@Injectable()
export class SpreadsheetState {
    activeCellLocation: CellLocation;
    columnDefinitionList: ColumnDefinition[];
    columnList: Column[];
    filterExpressionMap: { [gridColumnIndex: number]: string };
    gridColumnList: GridColumn[];
    columnPositionInformationMap: ColumnPositionInformationMap;
    bodyHeight: number;
    rowHeight: number;
    scrollTop: number;
    gridSectionScrollWidthMap: { [gridSectionName: string]: number };
    gridSectionScrollLeftMap: { [gridSectionName: string]: number };
    getRowStyle: (dataRow, rowType: ContentTypeEnum, rowIndex: number) => string;
    gridSectionList: GridSection[];
    gridSectionPositionInformationMap: GridSectionPositionInformationMap;
    gridSectionColumnToRendexIndexListMap: { [gridSectionName: string]: number[] };
    dataRowList: any[];
    originalDataRowList: any[];
    spreadsheetWidth: number;
    numberDataRowList: GridRow[];
    numberTitleRowList: GridRow[];

    constructor(spreadsheetState?: SpreadsheetState) {
        if (spreadsheetState == null) {
            this.activeCellLocation = { rowIndex: 0, gridColumnIndex: 0 };
            this.columnDefinitionList = [];
            this.columnList = [];
            this.gridColumnList = [];
            this.filterExpressionMap = {};
            this.columnPositionInformationMap = {};
            this.bodyHeight = 0;
            this.rowHeight = 20;
            this.scrollTop = 0;
            this.gridSectionList = [];
            this.gridSectionScrollWidthMap = {};
            this.gridSectionPositionInformationMap = {};
            this.dataRowList = [];
            this.originalDataRowList = [];
            this.spreadsheetWidth = 0;
            this.numberDataRowList = [];
            this.numberTitleRowList = [];
            this.gridSectionColumnToRendexIndexListMap = {};
            return;
        }
    }
}

export default SpreadsheetState;
export const SPREADSHEET_STATE_PROVIDERS = [provide(SpreadsheetState, { useFactory: () => { return new SpreadsheetState(); } })];