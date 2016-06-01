System.register(['@angular/core', '../Row/RowComponent', './Cell/CellComponent', '../../Services/Services'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, RowComponent_1, CellComponent_1, Services_1;
    var RowListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (RowComponent_1_1) {
                RowComponent_1 = RowComponent_1_1;
            },
            function (CellComponent_1_1) {
                CellComponent_1 = CellComponent_1_1;
            },
            function (Services_1_1) {
                Services_1 = Services_1_1;
            }],
        execute: function() {
            RowListComponent = (function () {
                function RowListComponent(rowViewportVisibleRowCountGetter, bodySectionScrollManager, cdr) {
                    var _this = this;
                    this.rowViewportVisibleRowCountGetter = rowViewportVisibleRowCountGetter;
                    this.bodySectionScrollManager = bodySectionScrollManager;
                    this.cdr = cdr;
                    this.bodySectionScrollManager.subscribe(function (param) {
                        if (param.gridSectionName === _this.gridSectionName) {
                            _this.cdr.markForCheck();
                        }
                    });
                }
                RowListComponent.prototype.rowIndentity = function (index, row) {
                    return index;
                };
                RowListComponent.prototype.cellIdentity = function (index, cell) {
                    return index;
                };
                __decorate([
                    core_1.Input('rowList'), 
                    __metadata('design:type', Array)
                ], RowListComponent.prototype, "rowList", void 0);
                __decorate([
                    core_1.Input('gridSectionName'), 
                    __metadata('design:type', String)
                ], RowListComponent.prototype, "gridSectionName", void 0);
                RowListComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        changeDetection: core_1.ChangeDetectionStrategy.Default,
                        directives: [RowComponent_1.RowComponent, CellComponent_1.CellComponent],
                        selector: "GgRowList",
                        templateUrl: 'RowList.html',
                    }), 
                    __metadata('design:paramtypes', [Services_1.RowViewportVisibleRowCountGetter, Services_1.BodySectionScrollManager, core_1.ChangeDetectorRef])
                ], RowListComponent);
                return RowListComponent;
            })();
            exports_1("RowListComponent", RowListComponent);
        }
    }
});
//# sourceMappingURL=RowListComponent.js.map