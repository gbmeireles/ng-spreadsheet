System.register(['@angular/core', '../../Components/Header/HeaderComponent', '../../Components/Body/BodyComponent', '../../Components/DetailsBar/DetailsBarComponent', '../../Components/StatusBar/StatusBarComponent', '../../Services/Services', '../../Model/ContentTypeEnum'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, HeaderComponent_1, BodyComponent_1, DetailsBarComponent_1, StatusBarComponent_1, Services_1, ContentTypeEnum_1;
    var GridComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (HeaderComponent_1_1) {
                HeaderComponent_1 = HeaderComponent_1_1;
            },
            function (BodyComponent_1_1) {
                BodyComponent_1 = BodyComponent_1_1;
            },
            function (DetailsBarComponent_1_1) {
                DetailsBarComponent_1 = DetailsBarComponent_1_1;
            },
            function (StatusBarComponent_1_1) {
                StatusBarComponent_1 = StatusBarComponent_1_1;
            },
            function (Services_1_1) {
                Services_1 = Services_1_1;
            },
            function (ContentTypeEnum_1_1) {
                ContentTypeEnum_1 = ContentTypeEnum_1_1;
            }],
        execute: function() {
            GridComponent = (function () {
                function GridComponent(el, columnListGetter, columnPositionInformationMapUpdater, sectionPositionInformationMapUpdater, gridDataManager, gridSectionListGetter, columnListManager, columnViewportUpdater, rowViewportUpdater, gridSectionListManager, rowHeightManager, cellListMapManager, columnPositionInformationMapManager, gridColumnListGetter, bodySectionScrollWidthManager, cdr, bodyScrollManager, bodySectionScrollManager, gridComponentManager) {
                    var _this = this;
                    this.el = el;
                    this.columnListGetter = columnListGetter;
                    this.columnPositionInformationMapUpdater = columnPositionInformationMapUpdater;
                    this.sectionPositionInformationMapUpdater = sectionPositionInformationMapUpdater;
                    this.gridDataManager = gridDataManager;
                    this.gridSectionListGetter = gridSectionListGetter;
                    this.columnListManager = columnListManager;
                    this.columnViewportUpdater = columnViewportUpdater;
                    this.rowViewportUpdater = rowViewportUpdater;
                    this.gridSectionListManager = gridSectionListManager;
                    this.rowHeightManager = rowHeightManager;
                    this.cellListMapManager = cellListMapManager;
                    this.columnPositionInformationMapManager = columnPositionInformationMapManager;
                    this.gridColumnListGetter = gridColumnListGetter;
                    this.bodySectionScrollWidthManager = bodySectionScrollWidthManager;
                    this.cdr = cdr;
                    this.bodyScrollManager = bodyScrollManager;
                    this.bodySectionScrollManager = bodySectionScrollManager;
                    this.gridComponentManager = gridComponentManager;
                    this.onGridEvent = new core_1.EventEmitter(false);
                    this.gridSectionList = [];
                    this.numberDataRowList = [];
                    this.numberTitleRowList = [];
                    this.columnList = [];
                    this.headerRowCount = 0;
                    this.rowHeight = 20;
                    this.gridComponentManager.set(this);
                    this.updateGridColumnMap(this.columnListManager.get());
                    this.columnListManager.subscribe(function (columnList) {
                        _this.updateGridColumnMap(columnList);
                    });
                    var storedScrollTop = 0;
                    this.columnPositionInformationMapUpdater.init();
                    this.sectionPositionInformationMapUpdater.init();
                    this.columnViewportUpdater.init();
                    this.unsubscribeBodyScrollChanges = this.bodyScrollManager.subscribe(function (scrollTop) {
                        storedScrollTop = scrollTop;
                        _this.rowViewportUpdater.update(scrollTop);
                        _this.updateGridSectionList(_this.gridSectionListManager.get());
                    });
                    this.unsubscribeGridSectionListChanges = this.gridSectionListManager.subscribe(function (gridSectionList) {
                        _this.updateGridSectionList(gridSectionList);
                    });
                    this.unsubscribeColumnPositionInformationChanges =
                        this.columnPositionInformationMapManager.subscribe(function (cpim) {
                            _this.updateBodySectionScrollWidth(cpim);
                            if (_this.gridSectionList.length > 0) {
                                _this.gridSectionList.forEach(function (gc) { return _this.columnViewportUpdater.update({
                                    gridSectionName: gc.name,
                                    scrollLeft: _this.bodySectionScrollManager.get(gc.name),
                                }); });
                            }
                        });
                }
                GridComponent.prototype.onFocus = function (evt) {
                    evt.preventDefault();
                };
                GridComponent.prototype.ngOnInit = function () {
                };
                GridComponent.prototype.ngOnDestroy = function () {
                    this.unsubscribeBodyScrollChanges();
                    this.unsubscribeGridSectionListChanges();
                    this.unsubscribeColumnPositionInformationChanges();
                };
                GridComponent.prototype.gridSectionIdentity = function (index, gridSection) {
                    if (gridSection) {
                        return gridSection.name;
                    }
                    return 'gridSection_' + index;
                };
                GridComponent.prototype.update = function (gridData) {
                    this.body.updateScrollTop();
                    this.rowHeight = gridData.rowHeight || this.rowHeight;
                    this.rowHeightManager.set(this.rowHeight);
                    this.columnList = this.columnListGetter.get(gridData);
                    var gridSectionList = this.gridSectionListGetter.get(gridData, this.columnList);
                    this.headerRowCount = gridSectionList[0].titleRowList.length;
                    this.columnListManager.set(this.columnList);
                    this.gridDataManager.set(gridData);
                    this.gridSectionListManager.set(gridSectionList);
                    this.updateBodySectionScrollWidth(this.columnPositionInformationMapManager.get());
                    this.cdr.markForCheck();
                };
                GridComponent.prototype.updateStatusMessage = function (message, timeout) {
                    this.statusMessage = message;
                    this.statusMessageTimeout = timeout;
                };
                GridComponent.prototype.updateGridColumnMap = function (columnList) {
                    var gridColumnMap = {};
                    this.gridColumnListGetter.get(columnList).forEach(function (gc) { return gridColumnMap[gc.index] = gc; });
                    this.cellListMapManager.updateGridColumnMap(gridColumnMap);
                };
                GridComponent.prototype.updateGridSectionList = function (gridSectionList) {
                    var _this = this;
                    this.gridSectionList = gridSectionList.map(function (gridSection) {
                        var index = 0;
                        _this.numberTitleRowList = new Array(gridSection.titleRowList.length);
                        while (index < gridSection.titleRowList.length) {
                            var visibleRow = gridSection.titleRowList[index];
                            var numberTitleRow = {
                                cellList: [],
                                height: _this.rowHeight,
                                rowData: null,
                                rowIndex: visibleRow.rowIndex,
                                rowNumber: visibleRow.rowIndex + 1,
                                rowStyle: '',
                                rowType: ContentTypeEnum_1.ContentTypeEnum.Title,
                                sectionRowIndex: visibleRow.sectionRowIndex,
                            };
                            _this.numberTitleRowList[index] = numberTitleRow;
                            index++;
                        }
                        index = 0;
                        _this.numberDataRowList = new Array(gridSection.visibleDataRowList.length);
                        while (index < gridSection.visibleDataRowList.length) {
                            var visibleRow = gridSection.visibleDataRowList[index];
                            var numberDataRow = {
                                cellList: [],
                                height: _this.rowHeight,
                                rowData: null,
                                rowIndex: visibleRow.rowIndex,
                                rowNumber: visibleRow.rowIndex + 1,
                                rowStyle: '',
                                rowType: ContentTypeEnum_1.ContentTypeEnum.Data,
                                sectionRowIndex: visibleRow.sectionRowIndex,
                            };
                            _this.numberDataRowList[index] = numberDataRow;
                            index++;
                        }
                        gridSection['dataRowListLength'] = gridSection.dataRowList.length;
                        return gridSection;
                    });
                    this.cdr.detectChanges();
                };
                GridComponent.prototype.updateBodySectionScrollWidth = function (cpim) {
                    var _this = this;
                    var gridSectionList = this.gridSectionListManager.get();
                    gridSectionList.forEach(function (gridSection) {
                        var scrollWidth = 0;
                        _this.gridColumnListGetter.get(gridSection.columnList).forEach(function (gc) { return scrollWidth += cpim[gc.index].width; });
                        _this.bodySectionScrollWidthManager.set(gridSection.name, scrollWidth);
                    });
                };
                __decorate([
                    core_1.Input('id'), 
                    __metadata('design:type', String)
                ], GridComponent.prototype, "id", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], GridComponent.prototype, "onGridEvent", void 0);
                __decorate([
                    core_1.ViewChild(BodyComponent_1.BodyComponent), 
                    __metadata('design:type', BodyComponent_1.BodyComponent)
                ], GridComponent.prototype, "body", void 0);
                __decorate([
                    core_1.HostListener('focusin', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [FocusEvent]), 
                    __metadata('design:returntype', void 0)
                ], GridComponent.prototype, "onFocus", null);
                GridComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        changeDetection: core_1.ChangeDetectionStrategy.Default,
                        directives: [
                            DetailsBarComponent_1.DetailsBarComponent,
                            HeaderComponent_1.HeaderComponent,
                            BodyComponent_1.BodyComponent,
                            StatusBarComponent_1.StatusBarComponent,
                        ],
                        providers: [
                            Services_1.GRID_SCOPE_SERVICES,
                        ],
                        selector: 'GgGrid',
                        templateUrl: 'Grid.html',
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, Services_1.ColumnListGetter, Services_1.ColumnPositionInformationMapUpdater, Services_1.SectionPositionInformationMapUpdater, Services_1.GridDataManager, Services_1.GridSectionListGetter, Services_1.ColumnListManager, Services_1.ColumnViewportUpdater, Services_1.RowViewportUpdater, Services_1.GridSectionListManager, Services_1.RowHeightManager, Services_1.CellListMapManager, Services_1.ColumnPositionInformationMapManager, Services_1.GridColumnListGetter, Services_1.BodySectionScrollWidthManager, core_1.ChangeDetectorRef, Services_1.BodyScrollManager, Services_1.BodySectionScrollManager, Services_1.GridComponentManager])
                ], GridComponent);
                return GridComponent;
            })();
            exports_1("GridComponent", GridComponent);
        }
    }
});
//# sourceMappingURL=GridComponent.js.map