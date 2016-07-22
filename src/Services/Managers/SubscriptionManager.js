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
var SubscriptionManager = (function () {
    function SubscriptionManager() {
    }
    SubscriptionManager.prototype.subscribe = function (eventName, onEvent) {
        if (!SubscriptionManager.subscriptionManagerStorage[eventName]) {
            SubscriptionManager.subscriptionManagerStorage[eventName] = [];
        }
        if (typeof onEvent !== 'function') {
            return function () { };
        }
        var subscriptionMap = SubscriptionManager.subscriptionManagerStorage[eventName];
        SubscriptionManager.subscriptionId++;
        var subscriptionId = SubscriptionManager.subscriptionId;
        subscriptionMap[subscriptionId] = onEvent;
        return function () {
            delete subscriptionMap[subscriptionId];
        };
    };
    SubscriptionManager.prototype.emit = function (eventName, value) {
        if (!SubscriptionManager.subscriptionManagerStorage[eventName]) {
            return;
        }
        var subscriptionMap = SubscriptionManager.subscriptionManagerStorage[eventName];
        Object.keys(subscriptionMap).forEach(function (key) {
            if (typeof subscriptionMap[key] === 'function') {
                subscriptionMap[key](value);
            }
        });
    };
    SubscriptionManager.subscriptionManagerStorage = {};
    SubscriptionManager.subscriptionId = 0;
    SubscriptionManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SubscriptionManager);
    return SubscriptionManager;
}());
exports.SubscriptionManager = SubscriptionManager;
//# sourceMappingURL=SubscriptionManager.js.map