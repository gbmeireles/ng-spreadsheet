System.register(['@angular/core', './SubscriptionManager'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, SubscriptionManager_1;
    var BodyScrollManager;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SubscriptionManager_1_1) {
                SubscriptionManager_1 = SubscriptionManager_1_1;
            }],
        execute: function() {
            BodyScrollManager = (function () {
                function BodyScrollManager(subscriptionManager) {
                    this.subscriptionManager = subscriptionManager;
                }
                BodyScrollManager.prototype.get = function () {
                    return this._scrollTop || 0;
                };
                BodyScrollManager.prototype.set = function (scrollTop) {
                    scrollTop = Math.max(scrollTop, 0);
                    if (this._scrollTop === scrollTop) {
                        return;
                    }
                    this._scrollTop = scrollTop;
                    this.subscriptionManager.emit('bodyScroll', this._scrollTop);
                };
                BodyScrollManager.prototype.triggerUpdate = function () {
                    this.subscriptionManager.emit('bodyScroll', this._scrollTop);
                };
                BodyScrollManager.prototype.subscribe = function (onChange) {
                    return this.subscriptionManager.subscribe('bodyScroll', onChange);
                };
                BodyScrollManager = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [SubscriptionManager_1.SubscriptionManager])
                ], BodyScrollManager);
                return BodyScrollManager;
            })();
            exports_1("BodyScrollManager", BodyScrollManager);
        }
    }
});
//# sourceMappingURL=BodyScrollManager.js.map