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
var SubscriptionManager_1 = require('./SubscriptionManager');
var ActiveCellManager = (function () {
    function ActiveCellManager(subscriptionManager) {
        this.subscriptionManager = subscriptionManager;
    }
    ActiveCellManager.prototype.get = function () {
        return this._activeCell;
    };
    ActiveCellManager.prototype.set = function (activeCell) {
        if (this._activeCell === activeCell) {
            return;
        }
        this._activeCell = activeCell;
        this.subscriptionManager.emit('activeCell', activeCell);
    };
    ActiveCellManager.prototype.subscribe = function (onChange) {
        return this.subscriptionManager.subscribe('activeCell', onChange);
    };
    ActiveCellManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SubscriptionManager_1.SubscriptionManager])
    ], ActiveCellManager);
    return ActiveCellManager;
}());
exports.ActiveCellManager = ActiveCellManager;
//# sourceMappingURL=ActiveCellManager.js.map