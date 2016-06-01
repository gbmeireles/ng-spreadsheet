System.register(['@angular/core', '../Services/GridRowspanSetter', '../Model/Model'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, GridRowspanSetter_1, Model_1;
    var TitleGridRowListGetter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (GridRowspanSetter_1_1) {
                GridRowspanSetter_1 = GridRowspanSetter_1_1;
            },
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }],
        execute: function() {
            TitleGridRowListGetter = (function () {
                function TitleGridRowListGetter(gridRowRowspanSetter) {
                    this.gridRowRowspanSetter = gridRowRowspanSetter;
                }
                TitleGridRowListGetter.prototype.get = function (gridData, gridColumnList) {
                    var result = [];
                    var columnListMap = {};
                    gridData.columnDefinitionList.forEach(function (c) {
                        if (!columnListMap[c.gridSection]) {
                            columnListMap[c.gridSection] = [];
                        }
                        columnListMap[c.gridSection].push(c);
                    });
                    gridColumnList.forEach(function (gridColumn) {
                        var indexOfColumn = gridColumnList.indexOf(gridColumn);
                        var column = columnListMap[gridColumn.gridSectionName][indexOfColumn];
                        var titleCellMatrix = column.getTitleCellMatrix(gridData, gridColumn);
                        for (var i = 0; i < titleCellMatrix.length; i++) {
                            var row = null;
                            if (result.length >= i + 1) {
                                row = result[i];
                            }
                            if (row == null) {
                                row = {
                                    cellList: [],
                                    height: gridData.rowHeight,
                                    rowData: null,
                                    rowIndex: i,
                                    rowStyle: '',
                                    rowType: Model_1.ContentTypeEnum.Title,
                                    sectionRowIndex: i,
                                };
                                result.push(row);
                            }
                            row.cellList = row.cellList.concat(titleCellMatrix[i]);
                        }
                    });
                    for (var i = 0; i < result.length; i++) {
                        var row = result[i];
                        row.rowIndex = i;
                        row.sectionRowIndex = i;
                        row.visibleCellList = row.cellList.slice(0, 20);
                        var lastCell = row.cellList[row.cellList.length - 1];
                        if (row.visibleCellList.indexOf(lastCell) < 0) {
                            row.visibleCellList.push(lastCell);
                        }
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
                TitleGridRowListGetter = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [GridRowspanSetter_1.GridRowspanSetter])
                ], TitleGridRowListGetter);
                return TitleGridRowListGetter;
            })();
            exports_1("TitleGridRowListGetter", TitleGridRowListGetter);
        }
    }
});
//# sourceMappingURL=TitleGridRowListGetter.js.map