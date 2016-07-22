System.register(['@angular/core', '../Services/Managers/Managers', '../Services/CellNavigator'], function(exports_1, context_1) {
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
    var core_1, Managers_1, CellNavigator_1;
    var ActiveCellGetter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Managers_1_1) {
                Managers_1 = Managers_1_1;
            },
            function (CellNavigator_1_1) {
                CellNavigator_1 = CellNavigator_1_1;
            }],
        execute: function() {
            ActiveCellGetter = (function () {
                function ActiveCellGetter(cellListMapManager, cellNavigator) {
                    this.cellListMapManager = cellListMapManager;
                    this.cellNavigator = cellNavigator;
                }
                ActiveCellGetter.prototype.get = function () {
                    var cellIndexData = this.cellNavigator.getCurrentActiveCellIndexData();
                    var cellListMap = this.cellListMapManager.getCellListMap();
                    var cellList = [];
                    Object.keys(cellListMap).forEach(function (key) { return cellList = cellList.concat(cellListMap[key]); });
                    var activeCell = cellList
                        .find(function (cell) { return cell.gridCell.columnIndex === cellIndexData.columnIndex && cell.gridCell.rowIndex === cellIndexData.rowIndex; });
                    return activeCell;
                };
                ActiveCellGetter = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Managers_1.CellListMapManager, CellNavigator_1.CellNavigator])
                ], ActiveCellGetter);
                return ActiveCellGetter;
            }());
            exports_1("ActiveCellGetter", ActiveCellGetter);
        }
    }
});
//# sourceMappingURL=ActiveCellGetter.js.map