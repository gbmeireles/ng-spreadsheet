System.register(['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var GridRowspanSetter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            GridRowspanSetter = (function () {
                function GridRowspanSetter() {
                }
                GridRowspanSetter.prototype.set = function (gridRowList) {
                    var rowCount = gridRowList.length;
                    var list = this.getRowCellList(gridRowList);
                    var cellByColumnMapByRowMap = this.getCellByColumnMapByRowMap(list);
                    var maxRowIndex = gridRowList.reduce(function (pv, cv) { return Math.max(cv.rowIndex, pv); }, 0);
                    list.forEach(function (rc) {
                        var nextRowCellInSameColumn = rc;
                        var rowIndex = rc.row.rowIndex + 1;
                        while (rowIndex <= maxRowIndex) {
                            if (!cellByColumnMapByRowMap[rowIndex]) {
                                rowIndex++;
                                continue;
                            }
                            var cellByColumnMap = cellByColumnMapByRowMap[rowIndex];
                            var columnIndex = rc.cell.columnIndex;
                            while (columnIndex >= 0) {
                                if (!cellByColumnMap[columnIndex]) {
                                    columnIndex--;
                                    continue;
                                }
                                var result = cellByColumnMap[columnIndex];
                                var maxAffectedColumnIndex = result.cell.columnIndex + result.cell.colspan - 1;
                                if (columnIndex < rc.cell.columnIndex && maxAffectedColumnIndex < rc.cell.columnIndex) {
                                    break;
                                }
                                if (maxAffectedColumnIndex >= rc.cell.columnIndex) {
                                    nextRowCellInSameColumn = result;
                                    break;
                                }
                                columnIndex--;
                            }
                            if (nextRowCellInSameColumn != rc) {
                                break;
                            }
                            rowIndex++;
                        }
                        if (nextRowCellInSameColumn == rc) {
                            rc.cell.rowspan = rowCount - rc.row.rowIndex;
                        }
                        else {
                            rc.cell.rowspan = (nextRowCellInSameColumn.row.rowIndex + nextRowCellInSameColumn.cell.rowspan - 1) - rc.row.rowIndex;
                        }
                    });
                };
                GridRowspanSetter.prototype.getRowCellList = function (gridRowList) {
                    if (gridRowList.length === 0) {
                        return [];
                    }
                    var result = new Array(gridRowList.length * gridRowList[0].cellList.length);
                    gridRowList = gridRowList.sort(function (rowA, rowB) { return (rowA.rowIndex > rowB.rowIndex) ? 1 : -1; });
                    var counter = 0;
                    gridRowList.forEach(function (row) {
                        row.cellList.forEach(function (cell) {
                            result[counter] = {
                                cell: cell,
                                row: row,
                            };
                        });
                        counter++;
                    });
                    return result;
                };
                GridRowspanSetter.prototype.getCellByColumnMapByRowMap = function (rowCellList) {
                    var result = {};
                    rowCellList.forEach(function (rc) {
                        if (!result[rc.row.rowIndex]) {
                            result[rc.row.rowIndex] = {};
                        }
                        result[rc.row.rowIndex][rc.cell.columnIndex] = rc;
                    });
                    return result;
                };
                GridRowspanSetter = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], GridRowspanSetter);
                return GridRowspanSetter;
            }());
            exports_1("GridRowspanSetter", GridRowspanSetter);
        }
    }
});
//# sourceMappingURL=GridRowspanSetter.js.map