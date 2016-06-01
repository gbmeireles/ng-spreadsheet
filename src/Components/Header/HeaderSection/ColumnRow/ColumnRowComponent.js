System.register(['@angular/core', '@angular/common', '../../../../Services/Services', './ColumnCell/ColumnCellComponent'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, Services_1, ColumnCellComponent_1;
    var columnUnitList, ColumnRowComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Services_1_1) {
                Services_1 = Services_1_1;
            },
            function (ColumnCellComponent_1_1) {
                ColumnCellComponent_1 = ColumnCellComponent_1_1;
            }],
        execute: function() {
            columnUnitList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            ColumnRowComponent = (function () {
                function ColumnRowComponent(el, columnListManager, gridColumnListGetter, bodySectionScrollWidthManager, renderer) {
                    var _this = this;
                    this.el = el;
                    this.columnListManager = columnListManager;
                    this.gridColumnListGetter = gridColumnListGetter;
                    this.bodySectionScrollWidthManager = bodySectionScrollWidthManager;
                    this.renderer = renderer;
                    this.gridColumnIdentifierMap = {};
                    this.columnListUnsubscribe = this.columnListManager.subscribe(this.updateColumnIdentifierList.bind(this));
                    this.unregisterScrollWidthSubscription = this.bodySectionScrollWidthManager.subscribe(function (response) {
                        if (response.gridSectionName === _this.gridSectionName) {
                            _this.renderer.setElementStyle(_this.el.nativeElement, 'minWidth', response.width + "px");
                        }
                    });
                }
                ColumnRowComponent.prototype.cellIndentity = function (index, cell) {
                    return index;
                };
                ColumnRowComponent.prototype.updateColumnIdentifierList = function (columnList) {
                    var _this = this;
                    this.gridColumnIdentifierMap = {};
                    var tensCount = 0;
                    var unitCount = 0;
                    columnList = columnList.filter(function (c) { return c.gridSectionName == _this.gridSectionName; });
                    this.gridColumnList = this.gridColumnListGetter.get(columnList);
                    this.gridColumnList.forEach(function (gc) {
                        unitCount = gc.index % columnUnitList.length;
                        tensCount = Math.floor(gc.index / columnUnitList.length);
                        var columnIdentifier = '';
                        if (tensCount > 0) {
                            columnIdentifier = columnUnitList[tensCount];
                        }
                        columnIdentifier = columnIdentifier + columnUnitList[unitCount];
                        _this.gridColumnIdentifierMap[gc.index] = columnIdentifier;
                    });
                };
                ColumnRowComponent.prototype.ngOnInit = function () {
                    this.updateColumnIdentifierList(this.columnListManager.get());
                    var width = this.bodySectionScrollWidthManager.get(this.gridSectionName);
                    this.renderer.setElementStyle(this.el.nativeElement, 'minWidth', width + "px");
                };
                ColumnRowComponent.prototype.ngOnDestroy = function () {
                    this.columnListUnsubscribe();
                    this.unregisterScrollWidthSubscription();
                };
                __decorate([
                    core_1.Input('gridSectionName'), 
                    __metadata('design:type', String)
                ], ColumnRowComponent.prototype, "gridSectionName", void 0);
                __decorate([
                    core_1.HostBinding('style.height'), 
                    __metadata('design:type', Number)
                ], ColumnRowComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input('visibleGridColumnList'), 
                    __metadata('design:type', Array)
                ], ColumnRowComponent.prototype, "visibleGridColumnList", void 0);
                ColumnRowComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        directives: [ColumnCellComponent_1.ColumnCellComponent, common_1.NgFor],
                        selector: 'GgColumnRow',
                        templateUrl: 'ColumnRow.html',
                        styleUrls: ['ColumnRow.css'],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, Services_1.ColumnListManager, Services_1.GridColumnListGetter, Services_1.BodySectionScrollWidthManager, core_1.Renderer])
                ], ColumnRowComponent);
                return ColumnRowComponent;
            })();
            exports_1("ColumnRowComponent", ColumnRowComponent);
        }
    }
});
//# sourceMappingURL=ColumnRowComponent.js.map