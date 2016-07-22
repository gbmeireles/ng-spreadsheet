System.register(['@angular/core', './SubscriptionManager', './TableIdManager'], function(exports_1, context_1) {
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
    var core_1, SubscriptionManager_1, TableIdManager_1;
    var ColumnPositionInformationMapManager;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SubscriptionManager_1_1) {
                SubscriptionManager_1 = SubscriptionManager_1_1;
            },
            function (TableIdManager_1_1) {
                TableIdManager_1 = TableIdManager_1_1;
            }],
        execute: function() {
            ColumnPositionInformationMapManager = (function () {
                function ColumnPositionInformationMapManager(subscriptionManager, tableIdManager) {
                    this.subscriptionManager = subscriptionManager;
                    this.tableIdManager = tableIdManager;
                    this.columnPositionInformationMap = {};
                }
                ColumnPositionInformationMapManager.prototype.get = function () {
                    return this.columnPositionInformationMap;
                };
                ColumnPositionInformationMapManager.prototype.set = function (columnPositionInformationMap) {
                    if (this.columnPositionInformationMap === columnPositionInformationMap) {
                        return;
                    }
                    this.columnPositionInformationMap = columnPositionInformationMap;
                    this.subscriptionManager.emit(this.getKey(), columnPositionInformationMap);
                };
                ColumnPositionInformationMapManager.prototype.subscribe = function (onChange) {
                    return this.subscriptionManager.subscribe(this.getKey(), onChange);
                };
                ColumnPositionInformationMapManager.prototype.getKey = function () {
                    var tableId = this.tableIdManager.get();
                    if (!tableId) {
                        console.warn('Cannot generate column position information storage key because table id is not defined');
                        return;
                    }
                    return tableId + "_columnPositionInformationMap";
                };
                ColumnPositionInformationMapManager = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [SubscriptionManager_1.SubscriptionManager, TableIdManager_1.TableIdManager])
                ], ColumnPositionInformationMapManager);
                return ColumnPositionInformationMapManager;
            }());
            exports_1("ColumnPositionInformationMapManager", ColumnPositionInformationMapManager);
        }
    }
});
//# sourceMappingURL=ColumnPositionInformationMapManager.js.map