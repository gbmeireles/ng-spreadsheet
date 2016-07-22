System.register(['@angular/core', '../../Services/Services', '../../Components/NumberRowList/NumberRowListComponent', '../../Components/Header/HeaderSection/HeaderSectionComponent', '../../Components/RowList/RowListComponent'], function(exports_1, context_1) {
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
    var core_1, Services_1, NumberRowListComponent_1, HeaderSectionComponent_1, RowListComponent_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Services_1_1) {
                Services_1 = Services_1_1;
            },
            function (NumberRowListComponent_1_1) {
                NumberRowListComponent_1 = NumberRowListComponent_1_1;
            },
            function (HeaderSectionComponent_1_1) {
                HeaderSectionComponent_1 = HeaderSectionComponent_1_1;
            },
            function (RowListComponent_1_1) {
                RowListComponent_1 = RowListComponent_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent(rowHeightManager) {
                    var _this = this;
                    this.rowHeightManager = rowHeightManager;
                    this.unsubscribeToRowHeightManagerChanges =
                        this.rowHeightManager.subscribe(function (rowHeight) { return _this.updateHeight(); });
                }
                HeaderComponent.prototype.ngOnChanges = function () {
                    this.updateHeight();
                };
                HeaderComponent.prototype.ngOnDestroy = function () {
                    this.unsubscribeToRowHeightManagerChanges();
                };
                HeaderComponent.prototype.updateHeight = function () {
                    this.height = this.rowCount * this.rowHeightManager.get() + 20;
                };
                __decorate([
                    core_1.HostBinding('style.height'), 
                    __metadata('design:type', Number)
                ], HeaderComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('rowCount'), 
                    __metadata('design:type', Number)
                ], HeaderComponent.prototype, "rowCount", void 0);
                __decorate([
                    core_1.Input('numberTitleRowList'), 
                    __metadata('design:type', Array)
                ], HeaderComponent.prototype, "numberTitleRowList", void 0);
                __decorate([
                    core_1.Input('gridSectionList'), 
                    __metadata('design:type', Array)
                ], HeaderComponent.prototype, "gridSectionList", void 0);
                HeaderComponent = __decorate([
                    core_1.Component({
                        moduleId: module.id,
                        selector: 'GgHeader',
                        templateUrl: 'Header.html',
                        styleUrls: ['Header.css'],
                        directives: [NumberRowListComponent_1.NumberRowListComponent, HeaderSectionComponent_1.HeaderSectionComponent, RowListComponent_1.RowListComponent],
                    }), 
                    __metadata('design:paramtypes', [Services_1.RowHeightManager])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});
//# sourceMappingURL=HeaderComponent.js.map