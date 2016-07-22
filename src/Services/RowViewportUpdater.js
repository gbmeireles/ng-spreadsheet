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
var GridSectionListManager_1 = require('../Services/Managers/GridSectionListManager');
var RowToRenderIndexListGetter_1 = require('../Services/RowToRenderIndexListGetter');
var RowViewportUpdater = (function () {
    function RowViewportUpdater(gridSectionListManager, rowToRenderIndexListGetter) {
        this.gridSectionListManager = gridSectionListManager;
        this.rowToRenderIndexListGetter = rowToRenderIndexListGetter;
    }
    RowViewportUpdater.prototype.update = function (scrollTop) {
        var visibleRowIndexList = this.rowToRenderIndexListGetter.getList(scrollTop);
        this.gridSectionListManager.get().forEach(function (gridSection) {
            var rowToAddList = visibleRowIndexList.map(function (sectionRowIndex) { return gridSection.dataRowMap[sectionRowIndex]; }).filter(function (c) { return c != null; });
            gridSection.visibleDataRowList = new Array(Math.min(visibleRowIndexList.length, rowToAddList.length));
            var counter = 0;
            rowToAddList.forEach(function (rowToAdd) {
                gridSection.visibleDataRowList[counter] = rowToAdd;
                counter++;
            });
        });
    };
    RowViewportUpdater = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [GridSectionListManager_1.GridSectionListManager, RowToRenderIndexListGetter_1.RowToRenderIndexListGetter])
    ], RowViewportUpdater);
    return RowViewportUpdater;
}());
exports.RowViewportUpdater = RowViewportUpdater;
//# sourceMappingURL=RowViewportUpdater.js.map