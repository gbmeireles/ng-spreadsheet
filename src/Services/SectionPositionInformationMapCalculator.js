System.register(['@angular/core', '../Services/Managers/Managers', '../Services/GridColumnListGetter'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Managers_1, GridColumnListGetter_1;
    var SectionPositionInformationMapCalculator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Managers_1_1) {
                Managers_1 = Managers_1_1;
            },
            function (GridColumnListGetter_1_1) {
                GridColumnListGetter_1 = GridColumnListGetter_1_1;
            }],
        execute: function() {
            SectionPositionInformationMapCalculator = (function () {
                function SectionPositionInformationMapCalculator(bodyWidthManager, gridColumnListGetter) {
                    this.bodyWidthManager = bodyWidthManager;
                    this.gridColumnListGetter = gridColumnListGetter;
                }
                SectionPositionInformationMapCalculator.prototype.calculate = function (gridSectionList) {
                    var _this = this;
                    var sectionPositionInformationMap = {};
                    var bodyWidth = this.bodyWidthManager.get();
                    var totalUsedWidth = 9999999999;
                    gridSectionList.forEach(function (gridSection) {
                        if (!sectionPositionInformationMap[gridSection.name]) {
                            sectionPositionInformationMap[gridSection.name] = {
                                left: 0,
                                width: 0,
                            };
                        }
                        _this.gridColumnListGetter.get(gridSection.columnList).forEach(function (gridColumn) {
                            sectionPositionInformationMap[gridColumn.gridSectionName].width += gridColumn.width;
                        });
                    });
                    var keyList = Object.keys(sectionPositionInformationMap);
                    var remainingWidth = bodyWidth - 40;
                    var expectedWidth = remainingWidth / keyList.length;
                    keyList.forEach(function (key) { return totalUsedWidth += sectionPositionInformationMap[key].width; });
                    keyList.map(function (key) { return sectionPositionInformationMap[key]; })
                        .filter(function (p) { return p.width <= expectedWidth; }).forEach(function (p) { return remainingWidth = remainingWidth - p.width; });
                    expectedWidth = remainingWidth / keyList.map(function (key) { return sectionPositionInformationMap[key]; }).filter(function (p) { return p.width > expectedWidth; }).length;
                    keyList.map(function (key) { return sectionPositionInformationMap[key]; }).filter(function (p) { return p.width > expectedWidth; }).forEach(function (p) { return p.width = expectedWidth; });
                    var currentSectionPosition = 20;
                    keyList.forEach(function (key) {
                        sectionPositionInformationMap[key].left = currentSectionPosition;
                        currentSectionPosition += sectionPositionInformationMap[key].width;
                    });
                    return sectionPositionInformationMap;
                };
                SectionPositionInformationMapCalculator = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Managers_1.BodyWidthManager, GridColumnListGetter_1.GridColumnListGetter])
                ], SectionPositionInformationMapCalculator);
                return SectionPositionInformationMapCalculator;
            })();
            exports_1("SectionPositionInformationMapCalculator", SectionPositionInformationMapCalculator);
        }
    }
});
//# sourceMappingURL=SectionPositionInformationMapCalculator.js.map