System.register(['@angular/core', '../../Model/ContentTypeEnum', '../../Services/Services'], function(exports_1, context_1) {
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
    var core_1, core_2, ContentTypeEnum_1, Services_1;
    var RowComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (ContentTypeEnum_1_1) {
                ContentTypeEnum_1 = ContentTypeEnum_1_1;
            },
            function (Services_1_1) {
                Services_1 = Services_1_1;
            }],
        execute: function() {
            RowComponent = (function () {
                function RowComponent(el, bodySectionScrollWidthManager, renderer) {
                    var _this = this;
                    this.el = el;
                    this.bodySectionScrollWidthManager = bodySectionScrollWidthManager;
                    this.renderer = renderer;
                    this.unregisterScrollWidthSubscription = this.bodySectionScrollWidthManager.subscribe(function (response) {
                        if (response.gridSectionName === _this.gridSectionName) {
                            _this.renderer.setElementStyle(_this.el.nativeElement, 'minWidth', response.width + "px");
                        }
                    });
                }
                RowComponent.prototype.ngOnChanges = function (changes) {
                    if (changes['row']) {
                        this.updateRow(changes['row'].currentValue);
                    }
                };
                RowComponent.prototype.ngOnInit = function () {
                    if (this.isInitialized) {
                        return;
                    }
                    this.isInitialized = true;
                    if (!this.row) {
                        return;
                    }
                    var height = this.row.height;
                    var width = this.bodySectionScrollWidthManager.get(this.gridSectionName);
                    this.renderer.setElementStyle(this.el.nativeElement, 'minWidth', width + "px");
                    this.renderer.setElementStyle(this.el.nativeElement, 'height', height + "px");
                };
                RowComponent.prototype.ngOnDestroy = function () {
                    this.unregisterScrollWidthSubscription();
                };
                RowComponent.prototype.updateRow = function (row) {
                    if (!row) {
                        return;
                    }
                    var height = row.height;
                    var top = 0;
                    if (row.rowType === ContentTypeEnum_1.ContentTypeEnum.Title) {
                        top = row.sectionRowIndex * height + 20;
                    }
                    else {
                        top = row.sectionRowIndex * height;
                    }
                    if (this.index === 0 && row.rowType === ContentTypeEnum_1.ContentTypeEnum.Data) {
                        this.renderer.setElementStyle(this.el.nativeElement, 'marginTop', top + "px");
                    }
                    else if (row.rowType === ContentTypeEnum_1.ContentTypeEnum.Title) {
                    }
                    var style = row.rowStyle;
                    this.renderer.setElementProperty(this.el.nativeElement, 'className', style);
                    // this.renderer.setElementClass(this.el.nativeElement, style, false);
                };
                __decorate([
                    core_1.Input('index'), 
                    __metadata('design:type', Number)
                ], RowComponent.prototype, "index", void 0);
                __decorate([
                    core_1.Input('row'), 
                    __metadata('design:type', Object)
                ], RowComponent.prototype, "row", void 0);
                __decorate([
                    core_1.Input('gridSectionName'), 
                    __metadata('design:type', String)
                ], RowComponent.prototype, "gridSectionName", void 0);
                RowComponent = __decorate([
                    core_1.Component({
                        moduleId: module.id,
                        selector: 'GgRow',
                        template: '<ng-content></ng-content>',
                        styleUrls: ['Row.css'],
                    }), 
                    __metadata('design:paramtypes', [core_2.ElementRef, Services_1.BodySectionScrollWidthManager, core_1.Renderer])
                ], RowComponent);
                return RowComponent;
            }());
            exports_1("RowComponent", RowComponent);
        }
    }
});
//# sourceMappingURL=RowComponent.js.map