System.register(['@angular/core', '../../Services/Services', '../../Components/Body/BodySection/BodySectionComponent', '../../Components/NumberRowList/NumberRowListComponent', '../../Components/RowList/RowListComponent'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Services_1, BodySectionComponent_1, NumberRowListComponent_1, RowListComponent_1;
    var BodyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Services_1_1) {
                Services_1 = Services_1_1;
            },
            function (BodySectionComponent_1_1) {
                BodySectionComponent_1 = BodySectionComponent_1_1;
            },
            function (NumberRowListComponent_1_1) {
                NumberRowListComponent_1 = NumberRowListComponent_1_1;
            },
            function (RowListComponent_1_1) {
                RowListComponent_1 = RowListComponent_1_1;
            }],
        execute: function() {
            BodyComponent = (function () {
                function BodyComponent(el, bodyWidthManager, bodyScrollManager, bodyHeightManager, rowHeightManager) {
                    var _this = this;
                    this.el = el;
                    this.bodyWidthManager = bodyWidthManager;
                    this.bodyScrollManager = bodyScrollManager;
                    this.bodyHeightManager = bodyHeightManager;
                    this.rowHeightManager = rowHeightManager;
                    this.gridSectionList = [];
                    this.numberDataRowList = [];
                    this.rowHeight = this.rowHeightManager.get();
                    this.rowHeightManager.subscribe(function (rowHeight) {
                        _this.rowHeight = rowHeight;
                    });
                }
                BodyComponent.prototype.ngOnInit = function () {
                    if (this.isInitialized) {
                        return;
                    }
                    this.isInitialized = true;
                    this.bodyWidthManager.set(this.el.nativeElement.clientWidth);
                    this.bodyHeightManager.set(this.el.nativeElement.clientHeight);
                };
                BodyComponent.prototype.updateScrollTop = function () {
                    if (this.rowNumberSection) {
                        this.bodyScrollManager.set(this.rowNumberSection.updateScrollTop());
                    }
                };
                BodyComponent.prototype.gridSectionIdentity = function (index, gridSection) {
                    if (gridSection) {
                        return gridSection.name;
                    }
                    return 'gridSection_' + index;
                };
                BodyComponent.prototype.onScroll = function () {
                    this.bodyScrollManager.set(this.el.nativeElement.scrollTop);
                };
                __decorate([
                    core_1.Input('gridSectionList'), 
                    __metadata('design:type', Array)
                ], BodyComponent.prototype, "gridSectionList", void 0);
                __decorate([
                    core_1.Input('numberDataRowList'), 
                    __metadata('design:type', Array)
                ], BodyComponent.prototype, "numberDataRowList", void 0);
                __decorate([
                    core_1.ViewChild(BodySectionComponent_1.BodySectionComponent), 
                    __metadata('design:type', BodySectionComponent_1.BodySectionComponent)
                ], BodyComponent.prototype, "rowNumberSection", void 0);
                __decorate([
                    core_1.HostListener('scroll'), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], BodyComponent.prototype, "onScroll", null);
                BodyComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'GgBody',
                        templateUrl: 'Body.html',
                        styleUrls: ['Body.css'],
                        directives: [BodySectionComponent_1.BodySectionComponent, NumberRowListComponent_1.NumberRowListComponent, RowListComponent_1.RowListComponent],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, Services_1.BodyWidthManager, Services_1.BodyScrollManager, Services_1.BodyHeightManager, Services_1.RowHeightManager])
                ], BodyComponent);
                return BodyComponent;
            })();
            exports_1("BodyComponent", BodyComponent);
        }
    }
});
//# sourceMappingURL=BodyComponent.js.map