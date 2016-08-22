import { Component, ViewChild, forwardRef, Injector, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { HTTP_PROVIDERS, Http }    from '@angular/http';
import { SpreadsheetComponent, ColumnDefinition, SpreadsheetCell, ContentTypeEnum, ColumnDataTypeEnum, Column } from 'ng-spreadsheet';
import { TreeToListConverter } from './tree/Services/TreeToListConverter';
import { TextEditorComponent } from './TextEditorComponent';
import { SimpleColumnCreator } from './SimpleColumnCreator';

@Component({
    selector: 'SpreadsheetDemoApp',
    templateUrl: 'app/App.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    @ViewChild(SpreadsheetComponent) table: SpreadsheetComponent;
    periodList: any[] = [];
    columnDefinitionList: ColumnDefinition[] = [];
    dataRowList: any[];

    constructor(private http: Http, private treeToListConverter: TreeToListConverter,
        private simpleColumnCreator: SimpleColumnCreator) {
    }

    ngOnInit() {
        this.http.get('./periodList.json', {}).subscribe((response) => {
            this.periodList = response.json().d.result;
            var gridData = this.getGridData();
            this.columnDefinitionList = gridData.columnDefinitionList;
        });
    }

    getRowStyle(dataRow, rowType: ContentTypeEnum, rowIndex: number) {
        if (rowType === ContentTypeEnum.Data && dataRow.level) {
            return `l${(dataRow.level || 0)}`;
        } else if (rowType === ContentTypeEnum.Title) {
            return 'title';
        } else {
            return 'standard';
        }
    }

    goToRow(rowNumber) {
        this.table.goToRow(rowNumber);
    }

    getGridData() {
        var titleColumn: ColumnDefinition = this.simpleColumnCreator.createColumn('item', 'Item', 'completeCode');
        var codeColumn: ColumnDefinition = this.simpleColumnCreator.createColumn('code', 'Code', 'code');
        var levelColumn: ColumnDefinition = this.simpleColumnCreator.createColumn('level', 'Level', 'level');
        var descriptionColumn: ColumnDefinition = this.simpleColumnCreator.createColumn('description', 'Description', 'description');
        var unitColumn: ColumnDefinition = this.simpleColumnCreator.createColumn('unit', 'Unit', 'unit');
        var periodColumn: ColumnDefinition = {
            description: '',
            getColumn: (columnStartIndex: number): Column => {
                return {
                    defaultWidth: 200,
                    endIndex: columnStartIndex + this.periodList.length - 1,
                    sectionName: 'PeriodList',
                    startIndex: columnStartIndex,
                    name: 'PeriodList',
                };
            },
            getDataCellMatrix: (rowData: any, gridColumn: Column): SpreadsheetCell[][] => {
                var columnIndex = gridColumn.startIndex;
                var index = 0;
                var cellFirstList: SpreadsheetCell[] = new Array(this.periodList.length);
                var cellSecondList: SpreadsheetCell[] = new Array(this.periodList.length);
                this.periodList.forEach(period => {
                    var data = rowData.periodValueMap[period.id];
                    cellFirstList[index] = {
                        cellStyle: 'data-cell',
                        colspan: 1,
                        columnIndex: columnIndex,
                        data: data,
                        editableComponentType: TextEditorComponent,
                        formatData: (rd) => (rd === undefined || !rd.periodValueMap || !rd.periodValueMap[period.id]) ?
                            '--' : (Math.round(rd.periodValueMap[period.id] * 100) / 100).toString(),
                        rowspan: 1,
                    };
                    cellSecondList[index] = {
                        cellStyle: 'data-cell',
                        colspan: 1,
                        columnIndex: columnIndex,
                        data: data,
                        editableComponentType: TextEditorComponent,
                        formatData: (rd) => (rd === undefined || !rd.periodValueMap || !rd.periodValueMap[period.id]) ?
                            '--' : (Math.round(rd.periodValueMap[period.id] * 100) / 100).toString(),
                        rowspan: 1,
                    };
                    columnIndex++;
                    index++;
                });
                return [cellFirstList];
            },
            getTitleCellMatrix: (column: Column): SpreadsheetCell[][] => {
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
                return [[{
                    cellStyle: 'title-cell',
                    colspan: this.periodList.length,
                    columnIndex: column.startIndex,
                    data: 'Period List',
                    rowspan: 1,
                }], cellList];
            },
            spreadsheetSection: 'PeriodList',
            name: name,
            dataType: ColumnDataTypeEnum.Number,
        };

        return {
            columnDefinitionList: [titleColumn, codeColumn, levelColumn, descriptionColumn, unitColumn, periodColumn],

        };
    }

    requestData() {
        this.http.get('./tree.json', {}).subscribe((res) => {
            var gridData = this.getGridData();
            var result = res.json().d.result;
            this.dataRowList =
                // this.treeToListConverter.convert(result).slice(0, 60);
                this.treeToListConverter.convert(result).slice(0);

            gridData = null;
        });

    }
}