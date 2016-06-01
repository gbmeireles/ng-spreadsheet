System.register(['@angular/core', '../Services/Managers/Managers', '../Services/ColumnToRenderIndexListGetter'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Managers_1, ColumnToRenderIndexListGetter_1;
    var ColumnViewportUpdater;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Managers_1_1) {
                Managers_1 = Managers_1_1;
            },
            function (ColumnToRenderIndexListGetter_1_1) {
                ColumnToRenderIndexListGetter_1 = ColumnToRenderIndexListGetter_1_1;
            }],
        execute: function() {
            ColumnViewportUpdater = (function () {
                function ColumnViewportUpdater(gridSectionListManager, bodySectionScrollManager, sectionPositionInformationMapManager, columnToRenderIndexListGetter) {
                    this.gridSectionListManager = gridSectionListManager;
                    this.bodySectionScrollManager = bodySectionScrollManager;
                    this.sectionPositionInformationMapManager = sectionPositionInformationMapManager;
                    this.columnToRenderIndexListGetter = columnToRenderIndexListGetter;
                }
                ColumnViewportUpdater.prototype.init = function () {
                    var _this = this;
                    this.bodySectionScrollManager.subscribe(function (response) {
                        _this.update(response);
                    });
                    this.sectionPositionInformationMapManager.subscribe(function (spim) {
                        Object.keys(function (gridSectionName) {
                            var scrollLeft = _this.bodySectionScrollManager.get(gridSectionName);
                            _this.update({ gridSectionName: gridSectionName, scrollLeft: scrollLeft });
                        });
                    });
                };
                ColumnViewportUpdater.prototype.update = function (response) {
                    var _this = this;
                    if (response.gridSectionName === 'RowNumber' || response.gridSectionName === 'Scroll') {
                        return;
                    }
                    var gridSection = this.gridSectionListManager.get().find(function (ts) { return ts.name === response.gridSectionName; });
                    if (!gridSection) {
                        return;
                    }
                    var validIndexList = this.columnToRenderIndexListGetter.update(response.gridSectionName, response.scrollLeft);
                    gridSection.titleRowList.forEach(function (row) {
                        row.visibleCellList = _this.getVisibleCellList(validIndexList, row);
                    });
                    gridSection.dataRowList.forEach(function (row) {
                        row.visibleCellList = _this.getVisibleCellList(validIndexList, row);
                    });
                };
                ColumnViewportUpdater.prototype.getVisibleCellList = function (validIndexList, row) {
                    var cellToAddList = validIndexList.map(function (columnIndex) { return row.cellMap[columnIndex]; });
                    cellToAddList = cellToAddList.filter(function (c) { return c != null; });
                    return cellToAddList;
                };
                ColumnViewportUpdater = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Managers_1.GridSectionListManager, Managers_1.BodySectionScrollManager, Managers_1.SectionPositionInformationMapManager, ColumnToRenderIndexListGetter_1.ColumnToRenderIndexListGetter])
                ], ColumnViewportUpdater);
                return ColumnViewportUpdater;
            })();
            exports_1("ColumnViewportUpdater", ColumnViewportUpdater);
        }
    }
});
//# sourceMappingURL=ColumnViewportUpdater.js.map