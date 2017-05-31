import { SpreadsheetCell } from './spreadsheet-cell';
import { Column } from './column';
import { ColumnDefinition } from './column-definition';
import { ColumnDataTypeEnum } from './column-data-type-enum';

export interface ColumnDefinition {
  name: string;
  description?: string;
  isHidden?: boolean;
  spreadsheetSection?: string;
  dataType: ColumnDataTypeEnum;
  filterExpressionMap?: { [columnIndex: number]: string };
  isExportable?: boolean;

  getTitleCellMatrix(column: Column, columnList: Column[], columnDefinitionList: ColumnDefinition[]): SpreadsheetCell[][];
  getDataCellMatrix(rowData: any, column: Column, columnList: Column[], columnDefinitionList: ColumnDefinition[]): SpreadsheetCell[][];
  getColumn(columnStartIndex: number, columnDefinitionList: ColumnDefinition[]): Column;
}