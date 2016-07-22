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
var StatusBarComponent = (function () {
    function StatusBarComponent() {
        this.message = '';
        this.isVisible = false;
    }
    StatusBarComponent.prototype.ngOnInit = function () { };
    StatusBarComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['message']) {
            if (changes['message'].currentValue == null || changes['message'].currentValue == '') {
                this.isVisible = false;
            }
            else {
                this.isVisible = true;
            }
        }
        if (changes['timeout']) {
            clearTimeout(this.timeoutId);
            if (changes['timeout'].currentValue !== undefined) {
                this.timeoutId = setTimeout(function () {
                    _this.isVisible = false;
                    _this.timeout = undefined;
                }, this.timeout);
            }
        }
    };
    __decorate([
        core_1.Input('message'), 
        __metadata('design:type', Object)
    ], StatusBarComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input('timeout'), 
        __metadata('design:type', Number)
    ], StatusBarComponent.prototype, "timeout", void 0);
    StatusBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'GgStatusBar',
            templateUrl: 'StatusBar.html',
            styleUrls: ['StatusBar.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], StatusBarComponent);
    return StatusBarComponent;
}());
exports.StatusBarComponent = StatusBarComponent;
//# sourceMappingURL=StatusBarComponent.js.map