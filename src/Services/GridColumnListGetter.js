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
    var GridColumnListGetter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Managers_1_1) {
                Managers_1 = Managers_1_1;
            }],
        execute: function() {
            GridColumnListGetter = (function () {
                function GridColumnListGetter(columnListManager) {
                    this.columnListManager = columnListManager;
                }
                GridColumnListGetter.prototype.get = function (columnList) {
                    if (columnList === void 0) { columnList = null; }
                    var lastIndex = -1;
                    var result = [];
                    columnList.forEach(function (column) {
                        var columnIndex = column.startIndex;
                        while (columnIndex <= column.endIndex) {
                            result.push({
                                gridSectionName: column.gridSectionName,
                                index: columnIndex,
                                name: column.name,
                                style: column.style,
                                width: column.width,
                            });
                            columnIndex++;
                        }
                    });
                    return result;
                };
                GridColumnListGetter = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Managers_1.ColumnListManager])
                ], GridColumnListGetter);
                return GridColumnListGetter;
            }());
            exports_1("GridColumnListGetter", GridColumnListGetter);
        }
    }
});
//# sourceMappingURL=GridColumnListGetter.js.map