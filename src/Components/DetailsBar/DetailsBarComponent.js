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
var ActiveCellManager_1 = require('../../Services/Managers/ActiveCellManager');
var DetailsBarComponent = (function () {
    function DetailsBarComponent(activeCellManager) {
        this.activeCellManager = activeCellManager;
        this.activeCellData = 'Selecione uma célula';
    }
    DetailsBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeCellManager.subscribe(function (activeCell) {
            if (activeCell.formattedData == undefined) {
                _this.activeCellData = activeCell.data;
            }
            else {
                _this.activeCellData = activeCell.formattedData;
            }
        });
    };
    DetailsBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'GgDetailsBar',
            templateUrl: 'DetailsBar.html',
            styleUrls: ['DetailsBar.css'],
        }), 
        __metadata('design:paramtypes', [ActiveCellManager_1.ActiveCellManager])
    ], DetailsBarComponent);
    return DetailsBarComponent;
}());
exports.DetailsBarComponent = DetailsBarComponent;
//# sourceMappingURL=DetailsBarComponent.js.map