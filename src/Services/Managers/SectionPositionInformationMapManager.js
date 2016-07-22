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
var TableIdManager_1 = require('./TableIdManager');
var SectionPositionInformationMapManager = (function () {
    function SectionPositionInformationMapManager(subscriptionManager, tableIdManager) {
        this.subscriptionManager = subscriptionManager;
        this.tableIdManager = tableIdManager;
    }
    SectionPositionInformationMapManager.prototype.get = function () {
        var storageKey = this.getKey();
        if (!storageKey) {
            console.warn('Cannot load previous section position information because storage key is not defined');
            return {};
        }
        return (JSON.parse(localStorage.getItem(storageKey)) || {});
    };
    SectionPositionInformationMapManager.prototype.set = function (sectionPositionInformationMap) {
        var storageKey = this.getKey();
        if (!storageKey) {
            console.warn('Cannot save section position information because storage key is not defined');
        }
        else {
            window.localStorage.setItem(storageKey, JSON.stringify(sectionPositionInformationMap));
        }
        this.notifyChange(sectionPositionInformationMap);
    };
    SectionPositionInformationMapManager.prototype.subscribe = function (onChange) {
        return this.subscriptionManager.subscribe(this.getKey(), onChange);
    };
    SectionPositionInformationMapManager.prototype.notifyChange = function (sectionPositionInformationMap) {
        return this.subscriptionManager.emit(this.getKey(), sectionPositionInformationMap);
    };
    SectionPositionInformationMapManager.prototype.getKey = function () {
        var tableId = this.tableIdManager.get();
        if (!tableId) {
            console.warn('Cannot generate section position information storage key because table id is not defined');
            return;
        }
        return tableId + "_sectionPositionInformationMap";
    };
    SectionPositionInformationMapManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SubscriptionManager_1.SubscriptionManager, TableIdManager_1.TableIdManager])
    ], SectionPositionInformationMapManager);
    return SectionPositionInformationMapManager;
}());
exports.SectionPositionInformationMapManager = SectionPositionInformationMapManager;
//# sourceMappingURL=SectionPositionInformationMapManager.js.map