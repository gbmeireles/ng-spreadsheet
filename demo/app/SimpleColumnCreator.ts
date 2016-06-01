import { GridData, ColumnDefinition, GridCell, Column } from 'ng-spreadsheet';

export class SimpleColumnCreator {
    constructor() {

    }

    createColumn(name, title, dataField): ColumnDefinition {
        return {
            description: '',
            getColumn: (rowDataList: any[], columnStartIndex: number): Column => {
                return {
                    defaultWidth: 120,
                    endIndex: columnStartIndex,
                    gridSectionName: 'GeneralData',
                    startIndex: columnStartIndex,
                };
            },
            getDataCellMatrix: (gridData: GridData, rowData: any, column: Column): GridCell[][] => {
                return [[{
                    cellStyle: 'data-cell',
                    colspan: 1,
                    columnIndex: column.startIndex,
                    data: rowData[dataField],
                    rowspan: 1,
                }]];
            },
            getTitleCellMatrix: (gridData: GridData, column: Column): GridCell[][] => {
                return [[{
                    cellStyle: 'title-cell',
                    colspan: 1,
                    columnIndex: column.startIndex,
                    data: title,
                    rowspan: 1,
                }]];
            },
            gridSection: 'GeneralData',
            name: name,
        };
    }
}