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
var Managers_1 = require('../Services/Managers/Managers');
var RowViewportVisibleRowCountGetter_1 = require('../Services/RowViewportVisibleRowCountGetter');
var RowToRenderIndexListGetter = (function () {
    function RowToRenderIndexListGetter(gridSectionListManager, rowHeightManager, rowViewportVisibleRowCountGetter) {
        this.gridSectionListManager = gridSectionListManager;
        this.rowHeightManager = rowHeightManager;
        this.rowViewportVisibleRowCountGetter = rowViewportVisibleRowCountGetter;
        this.rowToRenderIndexList = [];
    }
    RowToRenderIndexListGetter.prototype.getListForGridSection = function (gridSection, scrollTop) {
        var rowHeight = this.rowHeightManager.get();
        var visibleRowCount = this.rowViewportVisibleRowCountGetter.get();
        if (scrollTop < 0) {
            return this.rowToRenderIndexList;
        }
        var firstVisibleRowIndex = Math.floor(scrollTop / rowHeight) || 0;
        firstVisibleRowIndex = Math.max(firstVisibleRowIndex, 0);
        var lastVisibleRowIndex = visibleRowCount + firstVisibleRowIndex;
        var rowList = gridSection.dataRowList;
        if (lastVisibleRowIndex > rowList.length - 1) {
            lastVisibleRowIndex = rowList.length - 1;
            firstVisibleRowIndex = Math.max(lastVisibleRowIndex - visibleRowCount - 2, 0);
        }
        if (this.previousFirstVisibleRowIndex === firstVisibleRowIndex && this.previousLastVisibleRowIndex === lastVisibleRowIndex) {
            return this.rowToRenderIndexList;
        }
        this.previousFirstVisibleRowIndex = firstVisibleRowIndex;
        this.previousLastVisibleRowIndex = lastVisibleRowIndex;
        this.rowToRenderIndexList = this.getVisibleRowIndexList(visibleRowCount, firstVisibleRowIndex, lastVisibleRowIndex);
        return this.rowToRenderIndexList;
    };
    RowToRenderIndexListGetter.prototype.getList = function (scrollTop) {
        var gridSection = this.gridSectionListManager.get()[0];
        if (!gridSection) {
            return [];
        }
        return this.getListForGridSection(gridSection, scrollTop);
    };
    RowToRenderIndexListGetter.prototype.getVisibleRowIndexList = function (visibleRowCount, firstVisibleRowIndex, lastVisibleRowIndex) {
        var visibleRowIndexList = new Array(visibleRowCount);
        var index = firstVisibleRowIndex;
        var counter = 0;
        while (index <= lastVisibleRowIndex) {
            visibleRowIndexList[counter] = index;
            counter++;
            index++;
        }
        return visibleRowIndexList;
    };
    RowToRenderIndexListGetter = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [GridSectionListManager_1.GridSectionListManager, Managers_1.RowHeightManager, RowViewportVisibleRowCountGetter_1.RowViewportVisibleRowCountGetter])
    ], RowToRenderIndexListGetter);
    return RowToRenderIndexListGetter;
}());
exports.RowToRenderIndexListGetter = RowToRenderIndexListGetter;
//# sourceMappingURL=RowToRenderIndexListGetter.js.map