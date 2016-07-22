System.register(['@angular/core', '../Services/Managers/Managers'], function(exports_1, context_1) {
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
    var core_1, Managers_1;
    var RowViewportVisibleRowCountGetter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Managers_1_1) {
                Managers_1 = Managers_1_1;
            }],
        execute: function() {
            RowViewportVisibleRowCountGetter = (function () {
                function RowViewportVisibleRowCountGetter(bodyHeightManager, rowHeightManager) {
                    this.bodyHeightManager = bodyHeightManager;
                    this.rowHeightManager = rowHeightManager;
                }
                RowViewportVisibleRowCountGetter.prototype.get = function () {
                    var bodyHeight = this.bodyHeightManager.get();
                    var rowHeight = this.rowHeightManager.get();
                    if (rowHeight === undefined) {
                        throw 'Row height is not defined';
                    }
                    var visibleRowCount = Math.ceil(bodyHeight / rowHeight);
                    return visibleRowCount;
                };
                RowViewportVisibleRowCountGetter = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Managers_1.BodyHeightManager, Managers_1.RowHeightManager])
                ], RowViewportVisibleRowCountGetter);
                return RowViewportVisibleRowCountGetter;
            }());
            exports_1("RowViewportVisibleRowCountGetter", RowViewportVisibleRowCountGetter);
        }
    }
});
//# sourceMappingURL=RowViewportVisibleRowCountGetter.js.map