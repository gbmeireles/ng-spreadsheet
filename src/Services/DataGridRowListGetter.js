"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var GridRowspanSetter_1 = require('../Services/GridRowspanSetter');
var Model_1 = require('../Model/Model');
var DataGridRowListGetter = (function () {
    function DataGridRowListGetter(gridRowRowspanSetter) {
        this.gridRowRowspanSetter = gridRowRowspanSetter;
    }
    DataGridRowListGetter.prototype.get = function (gridData, gridColumnList, titleRowListCount) {
        var result = new Array(gridData.dataRowList.length);
        var columnListMap = {};
        gridData.columnDefinitionList.forEach(function (c) {
            if (!columnListMap[c.gridSection]) {
                columnListMap[c.gridSection] = [];
            }
            columnListMap[c.gridSection].push(c);
        });
        var counter = 0;
        var cellCounter = 0;
        gridData.dataRowList.forEach(function (rowData) {
            var rowDataGridRowList = [];
            gridColumnList.forEach(function (gridColumn) {
                var indexOfColumn = gridColumnList.indexOf(gridColumn);
                var column = columnListMap[gridColumn.gridSectionName][indexOfColumn];
                var dataCellMatrix = column.getDataCellMatrix(gridData, rowData, gridColumn);
                var lastRow = null;
                for (var i = 0; i < dataCellMatrix.length; i++) {
                    var row = null;
                    if (rowDataGridRowList.length >= i + 1) {
                        row = rowDataGridRowList[i];
                    }
                    if (row == null) {
                        if (result[counter - 1]) {
                            result[counter - 1].cellList.length = cellCounter;
                        }
                        cellCounter = 0;
                        row = {
                            cellList: new Array(gridColumnList.length),
                            height: gridData.rowHeight,
                            rowData: rowData,
                            rowIndex: 0,
                            rowStyle: '',
                            rowType: Model_1.ContentTypeEnum.Data,
                            sectionRowIndex: 0,
                        };
                        rowDataGridRowList.push(row);
                        result[counter] = row;
                        counter++;
                    }
                    var dataCellMatrixLength = dataCellMatrix[i].length;
                    var dataCellCounter = 0;
                    while (dataCellCounter < dataCellMatrixLength) {
                        row.cellList[cellCounter] = dataCellMatrix[i][dataCellCounter];
                        cellCounter++;
                        dataCellCounter++;
                    }
                }
                if (result[counter - 1]) {
                    result[counter - 1].cellList.length = cellCounter;
                }
            });
        });
        var lastIndex = result.length;
        for (var i = 0; i < lastIndex; i++) {
            var row = result[i];
            row.rowIndex = i + titleRowListCount;
            row.sectionRowIndex = i;
            row.visibleCellList = row.cellList.slice(0, 20);
            row.cellMap = {};
            row.cellList.forEach(function (cell) {
                cell.rowIndex = row.rowIndex;
                cell.sectionRowIndex = row.sectionRowIndex;
                cell.cellType = row.rowType;
                row.cellMap[cell.columnIndex] = cell;
            });
            if (gridData.getRowStyle) {
                row.rowStyle = gridData.getRowStyle(row.rowData, row.rowType, row.sectionRowIndex);
            }
        }
        this.gridRowRowspanSetter.set(result);
        return result;
    };
    DataGridRowListGetter = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [GridRowspanSetter_1.GridRowspanSetter])
    ], DataGridRowListGetter);
    return DataGridRowListGetter;
}());
exports.DataGridRowListGetter = DataGridRowListGetter;
//# sourceMappingURL=DataGridRowListGetter.js.map