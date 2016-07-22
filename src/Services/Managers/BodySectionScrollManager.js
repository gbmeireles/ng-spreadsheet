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
var BodySectionScrollManager = (function () {
    function BodySectionScrollManager(subscriptionManager) {
        this.subscriptionManager = subscriptionManager;
        this.scrollLeftMap = {};
    }
    BodySectionScrollManager.prototype.get = function (gridSectionName) {
        return this.scrollLeftMap[gridSectionName] || 0;
    };
    BodySectionScrollManager.prototype.set = function (gridSectionName, scrollLeft) {
        if (this.scrollLeftMap[gridSectionName] === scrollLeft) {
            return;
        }
        this.scrollLeftMap[gridSectionName] = scrollLeft;
        this.subscriptionManager.emit('bodySectionScroll', { gridSectionName: gridSectionName, scrollLeft: scrollLeft });
    };
    BodySectionScrollManager.prototype.subscribe = function (onChange) {
        return this.subscriptionManager.subscribe('bodySectionScroll', onChange);
    };
    BodySectionScrollManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SubscriptionManager_1.SubscriptionManager])
    ], BodySectionScrollManager);
    return BodySectionScrollManager;
}());
exports.BodySectionScrollManager = BodySectionScrollManager;
//# sourceMappingURL=BodySectionScrollManager.js.map