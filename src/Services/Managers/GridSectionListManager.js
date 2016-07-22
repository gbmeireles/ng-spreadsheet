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
var GridSectionListManager = (function () {
    function GridSectionListManager(subscriptionManager) {
        this.subscriptionManager = subscriptionManager;
        this.gridSectionList = [];
    }
    GridSectionListManager.prototype.set = function (gridSectionList) {
        if (this.gridSectionList === gridSectionList) {
            return;
        }
        this.gridSectionList = gridSectionList;
        this.subscriptionManager.emit("tableSectionListChanged", gridSectionList);
    };
    GridSectionListManager.prototype.get = function () {
        return this.gridSectionList.slice(0);
    };
    GridSectionListManager.prototype.subscribe = function (onChange) {
        return this.subscriptionManager.subscribe("tableSectionListChanged", onChange);
    };
    GridSectionListManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SubscriptionManager_1.SubscriptionManager])
    ], GridSectionListManager);
    return GridSectionListManager;
}());
exports.GridSectionListManager = GridSectionListManager;
//# sourceMappingURL=GridSectionListManager.js.map