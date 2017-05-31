import { ColumnDefinition, SpreadsheetCell, Column, ColumnDataTypeEnum } from 'ng-spreadsheet';

export class SimpleColumnCreator {
  constructor() {

  }

  createColumn(name, title, dataField): ColumnDefinition {
    var result: ColumnDefinition = {
      description: '',
      getColumn: (columnStartIndex: number): Column => {
        return {
          defaultWidth: 120,
          endIndex: columnStartIndex,
          sectionName: 'GeneralData',
          startIndex: columnStartIndex,
        };
      },
      getDataCellMatrix: (rowData: any, column: Column): SpreadsheetCell[][] => {
        return [[{
          cellStyle: 'data-cell',
          colspan: 1,
          columnIndex: column.startIndex,
          data: rowData[dataField],
          rowspan: 1,
        }]];
      },
      getTitleCellMatrix: (column: Column): SpreadsheetCell[][] => {
        return [[{
          cellStyle: 'title-cell',
          colspan: 1,
          columnIndex: column.startIndex,
          data: title,
          rowspan: 1,
        }]];
      },
      spreadsheetSection: 'GeneralData',
      name: name,
      dataType: ColumnDataTypeEnum.Text,
    };

    return result;
  }
}