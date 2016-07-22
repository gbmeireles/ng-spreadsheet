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
var RowComponent_1 = require('../Row/RowComponent');
var NumberRowListComponent = (function () {
    function NumberRowListComponent() {
    }
    NumberRowListComponent.prototype.rowIndentity = function (index, row) {
        return index;
    };
    __decorate([
        core_1.Input('numberRowList'), 
        __metadata('design:type', Array)
    ], NumberRowListComponent.prototype, "numberRowList", void 0);
    __decorate([
        core_1.Input('rowHeight'), 
        __metadata('design:type', Number)
    ], NumberRowListComponent.prototype, "rowHeight", void 0);
    NumberRowListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            directives: [RowComponent_1.RowComponent],
            selector: "GgNumberRowList",
            templateUrl: 'NumberRowList.html',
            styleUrls: ['NumberRowList.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], NumberRowListComponent);
    return NumberRowListComponent;
}());
exports.NumberRowListComponent = NumberRowListComponent;
//# sourceMappingURL=NumberRowListComponent.js.map