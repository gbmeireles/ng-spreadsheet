System.register(['@angular/core', '../Services/TitleGridRowListGetter', '../Services/DataGridRowListGetter', '../Services/RowToRenderIndexListGetter', '../Services/Managers/BodyScrollManager'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, TitleGridRowListGetter_1, DataGridRowListGetter_1, RowToRenderIndexListGetter_1, BodyScrollManager_1;
    var GridSectionListGetter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (TitleGridRowListGetter_1_1) {
                TitleGridRowListGetter_1 = TitleGridRowListGetter_1_1;
            },
            function (DataGridRowListGetter_1_1) {
                DataGridRowListGetter_1 = DataGridRowListGetter_1_1;
            },
            function (RowToRenderIndexListGetter_1_1) {
                RowToRenderIndexListGetter_1 = RowToRenderIndexListGetter_1_1;
            },
            function (BodyScrollManager_1_1) {
                BodyScrollManager_1 = BodyScrollManager_1_1;
            }],
        execute: function() {
            GridSectionListGetter = (function () {
                function GridSectionListGetter(titleGridRowListGetter, dataGridRowListGetter, rowToRenderIndexListGetter, bodyScrollManager) {
                    this.titleGridRowListGetter = titleGridRowListGetter;
                    this.dataGridRowListGetter = dataGridRowListGetter;
                    this.rowToRenderIndexListGetter = rowToRenderIndexListGetter;
                    this.bodyScrollManager = bodyScrollManager;
                }
                GridSectionListGetter.prototype.get = function (gridData, gridColumnList) {
                    var _this = this;
                    var gridColumnListMap = {};
                    gridColumnList.forEach(function (gridColumn) {
                        if (!gridColumnListMap[gridColumn.gridSectionName]) {
                            gridColumnListMap[gridColumn.gridSectionName] = [];
                        }
                        gridColumnListMap[gridColumn.gridSectionName].push(gridColumn);
                    });
                    var gridSectionList = [];
                    Object.keys(gridColumnListMap).forEach(function (tableSectionName) {
                        var gridSectionColumnList = gridColumnListMap[tableSectionName];
                        gridSectionList.push({
                            columnList: gridSectionColumnList,
                            dataRowList: [],
                            dataRowMap: {},
                            name: tableSectionName,
                            titleRowList: [],
                        });
                    });
                    gridSectionList.forEach(function (gridSection) {
                        gridSection.columnList = gridSection.columnList.filter(function (gc) { return gc.gridSectionName === gridSection.name; });
                        var gridSectionColumnIdList = [];
                        gridSection.columnList.forEach(function (gridColumn) {
                            var columnIndex = gridColumn.startIndex;
                            while (columnIndex <= gridColumn.endIndex) {
                                gridSectionColumnIdList.push(columnIndex);
                                columnIndex++;
                            }
                        });
                        var titleRowList = _this.titleGridRowListGetter.get(gridData, gridSection.columnList);
                        var dataRowList = _this.dataGridRowListGetter.get(gridData, gridSection.columnList, titleRowList.length);
                        gridSection.titleRowList = titleRowList.map(function (row) {
                            return {
                                cellList: row.cellList.filter(function (c) { return gridSectionColumnIdList.indexOf(c.columnIndex) >= 0; }),
                                cellMap: row.cellMap,
                                height: gridData.rowHeight,
                                rowData: row.rowData,
                                rowIndex: row.rowIndex,
                                rowStyle: row.rowStyle,
                                rowType: row.rowType,
                                sectionRowIndex: row.sectionRowIndex,
                                top: top,
                                visibleCellList: row.visibleCellList,
                            };
                        });
                        gridSection.dataRowList = new Array(dataRowList.length);
                        gridSection.dataRowMap = {};
                        var counter = 0;
                        dataRowList.forEach(function (row) {
                            var gridRow = {
                                cellList: row.cellList.filter(function (c) { return gridSectionColumnIdList.indexOf(c.columnIndex) >= 0; }),
                                cellMap: row.cellMap,
                                height: gridData.rowHeight,
                                rowData: row.rowData,
                                rowIndex: row.rowIndex,
                                rowStyle: row.rowStyle,
                                rowType: row.rowType,
                                sectionRowIndex: row.sectionRowIndex,
                                visibleCellList: row.visibleCellList,
                            };
                            gridSection.dataRowList[counter] = gridRow;
                            gridSection.dataRowMap[gridRow.sectionRowIndex] = gridRow;
                            counter++;
                        });
                        var lastRow = gridSection.dataRowList[gridSection.dataRowList.length - 1];
                        var rowToRenderIndexList = _this.rowToRenderIndexListGetter.getListForGridSection(gridSection, _this.bodyScrollManager.get());
                        gridSection.visibleDataRowList = rowToRenderIndexList.map(function (index) { return gridSection.dataRowList[index]; }).filter(function (row) { return row != null; });
                    });
                    return gridSectionList;
                };
                GridSectionListGetter = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [TitleGridRowListGetter_1.TitleGridRowListGetter, DataGridRowListGetter_1.DataGridRowListGetter, RowToRenderIndexListGetter_1.RowToRenderIndexListGetter, BodyScrollManager_1.BodyScrollManager])
                ], GridSectionListGetter);
                return GridSectionListGetter;
            })();
            exports_1("GridSectionListGetter", GridSectionListGetter);
        }
    }
});
//# sourceMappingURL=GridSectionListGetter.js.map