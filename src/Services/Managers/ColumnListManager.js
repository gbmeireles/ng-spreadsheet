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
var ColumnListManager = (function () {
    function ColumnListManager(subscriptionManager) {
        this.subscriptionManager = subscriptionManager;
        this.columnList = [];
    }
    ColumnListManager.prototype.set = function (columnList) {
        if (this.columnList === columnList) {
            return;
        }
        this.columnList = columnList;
        this.subscriptionManager.emit("gridColumnListChanged", columnList);
    };
    ColumnListManager.prototype.get = function () {
        return this.columnList;
    };
    ColumnListManager.prototype.subscribe = function (onChange) {
        return this.subscriptionManager.subscribe("gridColumnListChanged", onChange);
    };
    ColumnListManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SubscriptionManager_1.SubscriptionManager])
    ], ColumnListManager);
    return ColumnListManager;
}());
exports.ColumnListManager = ColumnListManager;
//# sourceMappingURL=ColumnListManager.js.map