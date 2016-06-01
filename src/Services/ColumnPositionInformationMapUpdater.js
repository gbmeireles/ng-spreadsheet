System.register(['@angular/core', '../Services/ColumnPositionInformationMapCalculator', '../Services/Managers/Managers'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, ColumnPositionInformationMapCalculator_1, Managers_1;
    var ColumnPositionInformationMapUpdater;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ColumnPositionInformationMapCalculator_1_1) {
                ColumnPositionInformationMapCalculator_1 = ColumnPositionInformationMapCalculator_1_1;
            },
            function (Managers_1_1) {
                Managers_1 = Managers_1_1;
            }],
        execute: function() {
            ColumnPositionInformationMapUpdater = (function () {
                function ColumnPositionInformationMapUpdater(columnPositionInformationMapCalculator, columnListManager, columnPositionInformationMapManager) {
                    this.columnPositionInformationMapCalculator = columnPositionInformationMapCalculator;
                    this.columnListManager = columnListManager;
                    this.columnPositionInformationMapManager = columnPositionInformationMapManager;
                }
                ColumnPositionInformationMapUpdater.prototype.init = function () {
                    var _this = this;
                    this.columnListManager.subscribe(function (columnList) {
                        _this.update(columnList);
                    });
                };
                ColumnPositionInformationMapUpdater.prototype.update = function (columnList) {
                    var columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(columnList);
                    this.columnPositionInformationMapManager.set(columnPositionInformationMap);
                };
                ColumnPositionInformationMapUpdater = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [ColumnPositionInformationMapCalculator_1.ColumnPositionInformationMapCalculator, Managers_1.ColumnListManager, Managers_1.ColumnPositionInformationMapManager])
                ], ColumnPositionInformationMapUpdater);
                return ColumnPositionInformationMapUpdater;
            })();
            exports_1("ColumnPositionInformationMapUpdater", ColumnPositionInformationMapUpdater);
        }
    }
});
//# sourceMappingURL=ColumnPositionInformationMapUpdater.js.map