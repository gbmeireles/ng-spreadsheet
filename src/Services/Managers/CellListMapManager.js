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
var ColumnListManager_1 = require('./ColumnListManager');
var CellListMapManager = (function () {
    function CellListMapManager(columnListManager) {
        this.columnListManager = columnListManager;
        this.cellListMap = {};
        this.gridColumnMap = {};
    }
    CellListMapManager.prototype.updateGridColumnMap = function (gridColumnMap) {
        this.gridColumnMap = gridColumnMap;
    };
    CellListMapManager.prototype.getCellListMap = function () {
        return this.cellListMap || {};
    };
    CellListMapManager.prototype.getCellList = function (columnName) {
        return this.cellListMap[columnName] || [];
    };
    CellListMapManager.prototype.addCell = function (cell) {
        var columnName = this.getColumnName(cell.columnIndex);
        if (!this.cellListMap[columnName]) {
            this.cellListMap[columnName] = [];
        }
        if (this.cellListMap[columnName].indexOf(cell) >= 0) {
            return;
        }
        this.cellListMap[columnName].push(cell);
    };
    CellListMapManager.prototype.removeCell = function (cell) {
        var columnName = this.getColumnName(cell.columnIndex);
        if (!this.cellListMap[columnName]) {
            return;
        }
        var index = this.cellListMap[columnName].indexOf(cell);
        if (index < 0) {
            return;
        }
        this.cellListMap[columnName].splice(index, 1);
    };
    CellListMapManager.prototype.getColumnName = function (columnIndex) {
        if (!this.gridColumnMap[columnIndex]) {
            return;
        }
        return this.gridColumnMap[columnIndex].name;
    };
    CellListMapManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ColumnListManager_1.ColumnListManager])
    ], CellListMapManager);
    return CellListMapManager;
}());
exports.CellListMapManager = CellListMapManager;
//# sourceMappingURL=CellListMapManager.js.map