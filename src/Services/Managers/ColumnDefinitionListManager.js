System.register(['./SubscriptionManager', '@angular/core'], function(exports_1, context_1) {
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
    var SubscriptionManager_1, core_1;
    var ColumnDefinitionListManager;
    return {
        setters:[
            function (SubscriptionManager_1_1) {
                SubscriptionManager_1 = SubscriptionManager_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ColumnDefinitionListManager = (function () {
                function ColumnDefinitionListManager(subscriptionManager) {
                    this.subscriptionManager = subscriptionManager;
                    this.columnDefinitionList = [];
                }
                ColumnDefinitionListManager.prototype.get = function () {
                    return this.columnDefinitionList || [];
                };
                ColumnDefinitionListManager.prototype.set = function (columnDefinitionList) {
                    this.columnDefinitionList = columnDefinitionList;
                    this.subscriptionManager.emit('columnList', columnDefinitionList);
                };
                ColumnDefinitionListManager.prototype.subscribe = function (onChange) {
                    return this.subscriptionManager.subscribe('columnList', onChange);
                };
                ColumnDefinitionListManager = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [SubscriptionManager_1.SubscriptionManager])
                ], ColumnDefinitionListManager);
                return ColumnDefinitionListManager;
            }());
            exports_1("ColumnDefinitionListManager", ColumnDefinitionListManager);
        }
    }
});
//# sourceMappingURL=ColumnDefinitionListManager.js.map