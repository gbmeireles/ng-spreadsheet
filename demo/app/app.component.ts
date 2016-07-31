import { Component, ViewChild, forwardRef, Injector, ChangeDetectionStrategy } from '@angular/core';
import { HTTP_PROVIDERS, Http }    from '@angular/http';
import { SpreadsheetComponent, GridData, ColumnDefinition, GridCell, ContentTypeEnum, Column } from 'ng-spreadsheet';
import { CORE_DIRECTIVES, NgFor } from '@angular/common';
import { TreeToListConverter } from './tree/Services/TreeToListConverter';
import { TextEditorComponent } from './TextEditorComponent';
import { SimpleColumnCreator } from './SimpleColumnCreator';

@Component({
    directives: [SpreadsheetComponent, CORE_DIRECTIVES, NgFor],
    providers: [HTTP_PROVIDERS, TreeToListConverter, SimpleColumnCreator],
    selector: 'my-app',
    templateUrl: 'app/app.html',
})
export class AppComponent {
    @ViewChild(SpreadsheetComponent) table: SpreadsheetComponent;
    periodList: any[] = [];

    constructor(private http: Http, private treeToListConverter: TreeToListConverter,
        private simpleColumnCreator: SimpleColumnCreator) {
        this.http.get('./periodList.json', {}).subscribe((response) => {
            this.periodList = response.json().d.result;
        });
    }

    getGridData() {
        var titleColumn: ColumnDefinition = this.simpleColumnCreator.createColumn('item', 'Item', 'completeCode');
        var codeColumn: ColumnDefinition = this.simpleColumnCreator.createColumn('code', 'Code', 'code');
        var levelColumn: ColumnDefinition = this.simpleColumnCreator.createColumn('level', 'Level', 'level');
        var descriptionColumn: ColumnDefinition = this.simpleColumnCreator.createColumn('description', 'Description', 'description');
        var unitColumn: ColumnDefinition = this.simpleColumnCreator.createColumn('unit', 'Unit', 'unit');
        var periodColumn: ColumnDefinition = {
            description: '',
            getColumn: (rowDataList: any[], columnStartIndex: number): Column => {
                return {
                    defaultWidth: 200,
                    endIndex: columnStartIndex + this.periodList.length - 1,
                    gridSectionName: 'PeriodList',
                    startIndex: columnStartIndex,
                    name: 'PeriodList',
                };
            },
            getDataCellMatrix: (gridData: GridData, rowData: any, gridColumn: Column): GridCell[][] => {
                var columnIndex = gridColumn.startIndex;
                var index = 0;
                var cellList: GridCell[] = new Array(this.periodList.length);
                this.periodList.forEach(period => {
                    var data = rowData.periodValueMap[period.id];
                    cellList[index] = {
                        cellStyle: 'data-cell',
                        colspan: 1,
                        columnIndex: columnIndex,
                        data: data,
                        editableComponentType: TextEditorComponent,
                        formattedData: data === undefined ? '--' : (Math.round(rowData.periodValueMap[period.id] * 100) / 100).toString(),
                        rowspan: 1,
                    };
                    columnIndex++;
                    index++;
                });
                return [cellList];
            },
            getTitleCellMatrix: (gridData: GridData, column: Column): GridCell[][] => {
                var index = 0;
                var cellList = new Array(this.periodList.length);
                this.periodList.map(period => {
                    cellList[index] = {
                        cellStyle: 'title-cell',
                        colspan: 1,
                        columnIndex: column.startIndex + index,
                        data: period.shortName,
                        rowspan: 1,
                    };
                    index++;
                });
                return [cellList];
            },
            gridSection: 'PeriodList',
            name: name,
        };

        return {
            columnDefinitionList: [titleColumn, codeColumn, levelColumn, descriptionColumn, unitColumn, periodColumn],
            dataRowList: [],
            getRowStyle: (dataRow, rowType: ContentTypeEnum, rowIndex: number) => {
                if (rowType === ContentTypeEnum.Data && dataRow.level) {
                    return `l${(dataRow.level || 0)}`;
                } else if (rowType === ContentTypeEnum.Title) {
                    return 'title';
                } else {
                    return 'standard';
                }
            },
            rowHeight: 30,

        };
    }

    requestData() {
        this.http.get('./tree.json', {}).subscribe((res) => {
            var gridData = this.getGridData();
            var result = res.json().d.result;
            gridData.dataRowList =
                // this.treeToListConverter.convert(result).slice(0, 60);
                this.treeToListConverter.convert(result).slice(0);

            this.table.update(gridData);
            gridData = null;
        });

    }
}