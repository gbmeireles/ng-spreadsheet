System.register(['@angular/core', './SubscriptionManager'], function(exports_1, context_1) {
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
    var core_1, SubscriptionManager_1;
    var BodySectionScrollWidthManager;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SubscriptionManager_1_1) {
                SubscriptionManager_1 = SubscriptionManager_1_1;
            }],
        execute: function() {
            BodySectionScrollWidthManager = (function () {
                function BodySectionScrollWidthManager(subscriptionManager) {
                    this.subscriptionManager = subscriptionManager;
                    this.gridSectionScrollWidthMap = {};
                }
                BodySectionScrollWidthManager.prototype.set = function (gridSectionName, width) {
                    if (this.gridSectionScrollWidthMap[gridSectionName] === width) {
                        return;
                    }
                    this.gridSectionScrollWidthMap[gridSectionName] = width;
                    this.subscriptionManager.emit("bodySectionScrollWidthChanged", { gridSectionName: gridSectionName, width: width });
                };
                BodySectionScrollWidthManager.prototype.get = function (gridSectionName) {
                    return this.gridSectionScrollWidthMap[gridSectionName] || 0;
                };
                BodySectionScrollWidthManager.prototype.subscribe = function (onChange) {
                    return this.subscriptionManager.subscribe("bodySectionScrollWidthChanged", onChange);
                };
                BodySectionScrollWidthManager = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [SubscriptionManager_1.SubscriptionManager])
                ], BodySectionScrollWidthManager);
                return BodySectionScrollWidthManager;
            }());
            exports_1("BodySectionScrollWidthManager", BodySectionScrollWidthManager);
        }
    }
});
//# sourceMappingURL=BodySectionScrollWidthManager.js.map