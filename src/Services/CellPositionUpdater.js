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
var CellPositionUpdater = (function () {
    function CellPositionUpdater() {
    }
    CellPositionUpdater.prototype.update = function (cell, columnPositionInformationMap) {
        var columnPositionInformation = columnPositionInformationMap[cell.columnIndex];
        if (columnPositionInformation) {
            cell.width = columnPositionInformation.width;
            cell.left = columnPositionInformation.left;
        }
    };
    CellPositionUpdater = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CellPositionUpdater);
    return CellPositionUpdater;
}());
exports.CellPositionUpdater = CellPositionUpdater;
//# sourceMappingURL=CellPositionUpdater.js.map