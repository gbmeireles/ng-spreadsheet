System.register(['@angular/core', './SubscriptionManager'], function(exports_1) {
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
    var BodySectionWidthManager;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SubscriptionManager_1_1) {
                SubscriptionManager_1 = SubscriptionManager_1_1;
            }],
        execute: function() {
            BodySectionWidthManager = (function () {
                function BodySectionWidthManager(subscriptionManager) {
                    this.subscriptionManager = subscriptionManager;
                    this.gridSectionWidthMap = {};
                }
                BodySectionWidthManager.prototype.set = function (gridSectionName, width) {
                    if (this.gridSectionWidthMap[gridSectionName] === width) {
                        return;
                    }
                    this.gridSectionWidthMap[gridSectionName] = width;
                    this.subscriptionManager.emit("bodySectionWidthChanged", { gridSectionName: gridSectionName, width: width });
                };
                BodySectionWidthManager.prototype.get = function (gridSectionName) {
                    return this.gridSectionWidthMap[gridSectionName] || 0;
                };
                BodySectionWidthManager.prototype.subscribe = function (onChange) {
                    return this.subscriptionManager.subscribe("bodySectionWidthChanged", onChange);
                };
                BodySectionWidthManager = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [SubscriptionManager_1.SubscriptionManager])
                ], BodySectionWidthManager);
                return BodySectionWidthManager;
            })();
            exports_1("BodySectionWidthManager", BodySectionWidthManager);
        }
    }
});
//# sourceMappingURL=BodySectionWidthManager.js.map