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
var Services_1 = require('../../../Services/Services');
var ColumnRowComponent_1 = require('./ColumnRow/ColumnRowComponent');
var ColumnResizeComponent_1 = require('./ColumnResize/ColumnResizeComponent');
var HeaderSectionComponent = (function () {
    function HeaderSectionComponent(el, bodySectionScrollManager, sectionPositionInformationMapManager, rowHeightManager, columnListManager, gridColumnListGetter, columnToRenderIndexListGetter, columnPositionInformationMapManager) {
        this.el = el;
        this.bodySectionScrollManager = bodySectionScrollManager;
        this.sectionPositionInformationMapManager = sectionPositionInformationMapManager;
        this.rowHeightManager = rowHeightManager;
        this.columnListManager = columnListManager;
        this.gridColumnListGetter = gridColumnListGetter;
        this.columnToRenderIndexListGetter = columnToRenderIndexListGetter;
        this.columnPositionInformationMapManager = columnPositionInformationMapManager;
        this.visibleGridColumnList = [];
        this.isInitialized = false;
        this.subscribeToChanges();
    }
    HeaderSectionComponent.prototype.ngOnInit = function () {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;
        this.updateSectionPosition(this.sectionPositionInformationMapManager.get());
        this.updateVisibleGridColumnList();
    };
    HeaderSectionComponent.prototype.ngOnDestroy = function () {
    };
    HeaderSectionComponent.prototype.subscribeToChanges = function () {
        var _this = this;
        this.unregisterSectionPositionInformationMapSubscription =
            this.sectionPositionInformationMapManager.subscribe(function (sectionPositionInformationMap) {
                _this.updateSectionPosition(sectionPositionInformationMap);
            });
        this.unregisterBodySectionScrollSubscription = this.bodySectionScrollManager.subscribe(function (obj) {
            if (obj.gridSectionName === _this.gridSectionName) {
                _this.el.nativeElement.scrollLeft = obj.scrollLeft;
                _this.updateVisibleGridColumnList();
            }
        });
        this.unregisterColumnPositionInformationMapSubscription =
            this.columnPositionInformationMapManager.subscribe(function () { return _this.updateVisibleGridColumnList(); });
    };
    HeaderSectionComponent.prototype.unsubscribeToChanges = function () {
        this.unregisterBodySectionScrollSubscription();
        this.unregisterSectionPositionInformationMapSubscription();
        this.unregisterColumnPositionInformationMapSubscription();
    };
    HeaderSectionComponent.prototype.updateSectionPosition = function (sectionPositionInformationMap) {
        var sectionPositionInformation = sectionPositionInformationMap[this.gridSectionName];
        if (!sectionPositionInformation) {
            return;
        }
        this.left = sectionPositionInformation.left;
        this.width = sectionPositionInformation.width;
    };
    HeaderSectionComponent.prototype.updateVisibleGridColumnList = function () {
        var _this = this;
        var columnList = this.columnListManager.get().filter(function (gc) { return gc.gridSectionName == _this.gridSectionName; });
        var columnToRenderIndexList = this.columnToRenderIndexListGetter.update(this.gridSectionName, this.el.nativeElement.scrollLeft);
        this.visibleGridColumnList = this.gridColumnListGetter.get(columnList).filter(function (gc) { return columnToRenderIndexList.indexOf(gc.index) >= 0; });
    };
    __decorate([
        core_1.HostBinding('style.left'), 
        __metadata('design:type', Number)
    ], HeaderSectionComponent.prototype, "left", void 0);
    __decorate([
        core_1.HostBinding('style.width'), 
        __metadata('design:type', Number)
    ], HeaderSectionComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input('gridSectionName'), 
        __metadata('design:type', String)
    ], HeaderSectionComponent.prototype, "gridSectionName", void 0);
    HeaderSectionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            directives: [ColumnRowComponent_1.ColumnRowComponent, ColumnResizeComponent_1.ColumnResizeComponent],
            selector: 'GgHeaderSection',
            templateUrl: 'HeaderSection.html',
            styleUrls: ['HeaderSection.css'],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, Services_1.BodySectionScrollManager, Services_1.SectionPositionInformationMapManager, Services_1.RowHeightManager, Services_1.ColumnListManager, Services_1.GridColumnListGetter, Services_1.ColumnToRenderIndexListGetter, Services_1.ColumnPositionInformationMapManager])
    ], HeaderSectionComponent);
    return HeaderSectionComponent;
}());
exports.HeaderSectionComponent = HeaderSectionComponent;
//# sourceMappingURL=HeaderSectionComponent.js.map