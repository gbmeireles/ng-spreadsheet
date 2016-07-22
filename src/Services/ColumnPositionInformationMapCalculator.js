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
var GridColumnListGetter_1 = require('../Services/GridColumnListGetter');
var Managers_1 = require('../Services/Managers/Managers');
var ColumnPositionInformationMapCalculator = (function () {
    function ColumnPositionInformationMapCalculator(gridColumnListGetter, sectionPositionInformationMapManager) {
        this.gridColumnListGetter = gridColumnListGetter;
        this.sectionPositionInformationMapManager = sectionPositionInformationMapManager;
    }
    ColumnPositionInformationMapCalculator.prototype.calculate = function (columnList) {
        var gridColumnList = this.gridColumnListGetter.get(columnList);
        var initialColumnPositionInformationMap = this.getInitialColumnPositionInformationMap(gridColumnList);
        var columnPositionInformationMap = this.getColumnPositionInformationMapFilledForGridSection(gridColumnList, initialColumnPositionInformationMap);
        return columnPositionInformationMap;
    };
    ColumnPositionInformationMapCalculator.prototype.getInitialColumnPositionInformationMap = function (gridColumnList) {
        var currentColumnPositionBySectionMap = {};
        var columnPositionInformationMap = {};
        gridColumnList.forEach(function (gridColumn) {
            if (!currentColumnPositionBySectionMap[gridColumn.gridSectionName]) {
                currentColumnPositionBySectionMap[gridColumn.gridSectionName] = 0;
            }
            columnPositionInformationMap[gridColumn.index] = {
                left: currentColumnPositionBySectionMap[gridColumn.gridSectionName],
                width: gridColumn.width,
            };
            currentColumnPositionBySectionMap[gridColumn.gridSectionName] += gridColumn.width;
        });
        return columnPositionInformationMap;
    };
    ColumnPositionInformationMapCalculator.prototype.getColumnPositionInformationMapFilledForGridSection = function (gridColumnList, initialColumnPositionInformationMap) {
        var columnPositionInformationMap = this.getColumnPositionInformationMapCopy(initialColumnPositionInformationMap);
        var sectionPositionInformationMap = this.sectionPositionInformationMapManager.get();
        Object.keys(sectionPositionInformationMap).forEach(function (gridSectionName) {
            var gridSectionGridColumnList = gridColumnList.filter(function (gc) { return gc.gridSectionName === gridSectionName; });
            var lastGridColumn = gridSectionGridColumnList[gridSectionGridColumnList.length - 1];
            var left = columnPositionInformationMap[lastGridColumn.index].left;
            var calculatedTotalWidth = left + lastGridColumn.width;
            var sectionPositionInformation = sectionPositionInformationMap[gridSectionName];
            var expectedTotalWidth = sectionPositionInformation.width;
            if (expectedTotalWidth <= calculatedTotalWidth) {
                return;
            }
            var percentToMultiply = expectedTotalWidth / calculatedTotalWidth;
            var keys = Object.keys(columnPositionInformationMap);
            var remaining = expectedTotalWidth;
            keys.forEach(function (key) {
                var columnIndex = parseInt(key, 10);
                var oldWidth = columnPositionInformationMap[columnIndex].width;
                var newWidth = Math.round(oldWidth * percentToMultiply);
                var widthDifference = newWidth - oldWidth;
                remaining = remaining - widthDifference;
                if (remaining < 0) {
                    newWidth = newWidth + remaining;
                }
                columnPositionInformationMap[columnIndex].width = newWidth;
            });
            if (remaining > 0) {
                columnPositionInformationMap[lastGridColumn.index].width + remaining;
            }
            var left = 0;
            gridSectionGridColumnList.forEach(function (gc) {
                columnPositionInformationMap[lastGridColumn.index].left = left;
                left += columnPositionInformationMap[lastGridColumn.index].width;
            });
        });
        return columnPositionInformationMap;
    };
    ColumnPositionInformationMapCalculator.prototype.getColumnPositionInformationMapCopy = function (columnPositionInformationMapToCopy) {
        var columnPositionInformationMap = {};
        Object.keys(columnPositionInformationMapToCopy).forEach(function (key) {
            var columnIndex = parseInt(key, 10);
            columnPositionInformationMap[columnIndex] = {
                left: columnPositionInformationMapToCopy[columnIndex].left,
                width: columnPositionInformationMapToCopy[columnIndex].width,
            };
        });
        return columnPositionInformationMap;
    };
    ColumnPositionInformationMapCalculator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [GridColumnListGetter_1.GridColumnListGetter, Managers_1.SectionPositionInformationMapManager])
    ], ColumnPositionInformationMapCalculator);
    return ColumnPositionInformationMapCalculator;
}());
exports.ColumnPositionInformationMapCalculator = ColumnPositionInformationMapCalculator;
//# sourceMappingURL=ColumnPositionInformationMapCalculator.js.map