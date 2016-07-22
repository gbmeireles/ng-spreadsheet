System.register(['@angular/core', '../Services/Managers/Managers', '../Services/GridColumnListGetter'], function(exports_1, context_1) {
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
    var core_1, Managers_1, GridColumnListGetter_1;
    var ColumnToRenderIndexListGetter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Managers_1_1) {
                Managers_1 = Managers_1_1;
            },
            function (GridColumnListGetter_1_1) {
                GridColumnListGetter_1 = GridColumnListGetter_1_1;
            }],
        execute: function() {
            ColumnToRenderIndexListGetter = (function () {
                function ColumnToRenderIndexListGetter(bodySectionWidthManager, columnListManager, gridColumnListGetter, gridSectionListManager, bodySectionScrollManager, bodyWidthManager, sectionPositionInformationMapManager) {
                    this.bodySectionWidthManager = bodySectionWidthManager;
                    this.columnListManager = columnListManager;
                    this.gridColumnListGetter = gridColumnListGetter;
                    this.gridSectionListManager = gridSectionListManager;
                    this.bodySectionScrollManager = bodySectionScrollManager;
                    this.bodyWidthManager = bodyWidthManager;
                    this.sectionPositionInformationMapManager = sectionPositionInformationMapManager;
                    this.firstVisibleCellIndex = 0;
                    this.lastVisibleCellIndex = 0;
                }
                ColumnToRenderIndexListGetter.prototype.update = function (gridSectionName, scrollLeft) {
                    if (gridSectionName === 'RowNumber' || gridSectionName === 'Scroll') {
                        return this.getValidIndexList();
                    }
                    var gridSectionWidth = this.sectionPositionInformationMapManager.get()[gridSectionName].width;
                    if (!gridSectionWidth) {
                        throw 'Grid section width not available';
                    }
                    var gridSection = this.gridSectionListManager.get().find(function (ts) { return ts.name === gridSectionName; });
                    if (!gridSection) {
                        return this.getValidIndexList();
                    }
                    var gridColumnList = this.gridColumnListGetter.get(this.columnListManager.get())
                        .filter(function (gc) { return gc.gridSectionName === gridSectionName; });
                    if (gridColumnList.length === 0) {
                        return this.getValidIndexList();
                    }
                    var firstGridColumn = gridColumnList.reduce(function (pv, cv) { return pv.index < cv.index ? pv : cv; }, gridColumnList[0]);
                    var lastGridColumn = gridColumnList.reduce(function (pv, cv) { return pv.index > cv.index ? pv : cv; }, gridColumnList[0]);
                    var firstVisibleCellIndex = firstGridColumn.index;
                    var totalLeft = 0;
                    gridColumnList.forEach(function (gc) {
                        totalLeft += gc.width;
                        if (totalLeft >= scrollLeft) {
                            return;
                        }
                        firstVisibleCellIndex++;
                    });
                    var lastVisibleCellIndex = firstVisibleCellIndex;
                    var totalWidth = 0;
                    gridColumnList.filter(function (gc) { return gc.index >= firstVisibleCellIndex; }).forEach(function (gc) {
                        totalWidth += gc.width;
                        if (totalWidth >= gridSectionWidth) {
                            return;
                        }
                        lastVisibleCellIndex++;
                    });
                    var visibleCellCount = 3;
                    firstVisibleCellIndex = Math.max(firstVisibleCellIndex - 1, firstGridColumn.index);
                    lastVisibleCellIndex = Math.min(lastVisibleCellIndex + 1, lastGridColumn.index);
                    if (this.firstVisibleCellIndex === firstVisibleCellIndex && this.lastVisibleCellIndex === lastVisibleCellIndex) {
                        return this.getValidIndexList();
                    }
                    this.firstVisibleCellIndex = firstVisibleCellIndex;
                    this.lastVisibleCellIndex = lastVisibleCellIndex;
                    return this.getValidIndexList();
                };
                ColumnToRenderIndexListGetter.prototype.getValidIndexList = function () {
                    var validIndexList = [];
                    var validIndex = this.firstVisibleCellIndex;
                    while (validIndex <= this.lastVisibleCellIndex) {
                        validIndexList.push(validIndex);
                        validIndex++;
                    }
                    return validIndexList;
                };
                ColumnToRenderIndexListGetter = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Managers_1.BodySectionWidthManager, Managers_1.ColumnListManager, GridColumnListGetter_1.GridColumnListGetter, Managers_1.GridSectionListManager, Managers_1.BodySectionScrollManager, Managers_1.BodyWidthManager, Managers_1.SectionPositionInformationMapManager])
                ], ColumnToRenderIndexListGetter);
                return ColumnToRenderIndexListGetter;
            }());
            exports_1("ColumnToRenderIndexListGetter", ColumnToRenderIndexListGetter);
        }
    }
});
//# sourceMappingURL=ColumnToRenderIndexListGetter.js.map