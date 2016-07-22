System.register(['@angular/core', '../../../Model/Model', '../../../Services/Services'], function(exports_1, context_1) {
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
    var core_1, Model_1, Services_1;
    var CellComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Model_1_1) {
                Model_1 = Model_1_1;
            },
            function (Services_1_1) {
                Services_1 = Services_1_1;
            }],
        execute: function() {
            CellComponent = (function () {
                function CellComponent(dcl, el, app, gridDataManager, columnPositionInformationMapManager, cellPositionUpdater, cellListMapManager, cellNavigationManager, activeCellManager, cdr, renderer, viewContainerRef, gridComponentManager) {
                    var _this = this;
                    this.dcl = dcl;
                    this.el = el;
                    this.app = app;
                    this.gridDataManager = gridDataManager;
                    this.columnPositionInformationMapManager = columnPositionInformationMapManager;
                    this.cellPositionUpdater = cellPositionUpdater;
                    this.cellListMapManager = cellListMapManager;
                    this.cellNavigationManager = cellNavigationManager;
                    this.activeCellManager = activeCellManager;
                    this.cdr = cdr;
                    this.renderer = renderer;
                    this.viewContainerRef = viewContainerRef;
                    this.gridComponentManager = gridComponentManager;
                    this.isActive = false;
                    this.isEditing = false;
                    this.unregisterColumnPositionInformationMapSubscription =
                        this.columnPositionInformationMapManager.subscribe(function (columnPositionInformationMap) {
                            _this.cellPositionUpdater.update(_this, columnPositionInformationMap);
                        });
                    this.unregisterActiveCellSubscription = this.activeCellManager.subscribe(function (activeCell) {
                        _this.updadteIsActiveStatus(_this.gridCell);
                    });
                }
                CellComponent.prototype.onClick = function (evt) {
                    this.cellNavigationManager.goTo(this.gridCell.rowIndex, this.gridCell.columnIndex);
                };
                CellComponent.prototype.onDoubleClick = function (evt) {
                    this.cellNavigationManager.goTo(this.gridCell.rowIndex, this.gridCell.columnIndex);
                    this.goToEditMode();
                };
                CellComponent.prototype.ngOnChanges = function (changes) {
                    if (changes['gridCell']) {
                        this.initCell(this.gridCell);
                    }
                };
                CellComponent.prototype.ngOnInit = function () {
                };
                CellComponent.prototype.ngAfterViewInit = function () {
                    this.initCell(this.gridCell);
                    this.cellListMapManager.addCell(this);
                    if (this.gridCell.cellType === Model_1.ContentTypeEnum.Title) {
                        return;
                    }
                };
                CellComponent.prototype.goToEditMode = function () {
                    var _this = this;
                    if (this.gridCell.editableComponentType && !this.isEditing) {
                        this.cdr.markForCheck();
                        this.isEditing = true;
                        this.clear();
                        var gridData = this.gridDataManager.get();
                        var gridComponent = this.gridComponentManager.get();
                        this.dcl.loadNextToLocation(this.gridCell.editableComponentType, this.cellViewContainer, core_1.ReflectiveInjector.resolve(gridData.providerList)).then(function (componentRef) {
                            _this.editComponent = componentRef;
                            componentRef.instance.onEditStarted(gridComponent, _this.gridCell, _this.rowData);
                            _this.unregisterEditableComponentActiveCellSubscription = _this.activeCellManager.subscribe(function () {
                                _this.unregisterEditableComponentActiveCellSubscription();
                                componentRef.instance.onEditDone(gridComponent, _this.gridCell, _this.rowData);
                                _this.goToViewMode();
                            });
                            componentRef.onDestroy(function () {
                                gridComponent.onGridEvent.emit({
                                    eventType: 'EditDone',
                                    eventData: {
                                        gridComponent: gridComponent,
                                        gridData: gridData,
                                        rowData: _this.rowData,
                                        gridCell: _this.gridCell,
                                    },
                                });
                                _this.isEditing = false;
                                if (_this.unregisterEditableComponentActiveCellSubscription) {
                                    _this.unregisterEditableComponentActiveCellSubscription();
                                }
                            });
                        });
                    }
                };
                CellComponent.prototype.cancelEdit = function () {
                    if (this.editComponent) {
                        var editableComponent = this.editComponent.instance;
                        var gridComponent = this.gridComponentManager.get();
                        editableComponent.onCancelEdit(gridComponent, this.gridCell, this.rowData);
                        this.goToViewMode();
                    }
                };
                CellComponent.prototype.goToViewMode = function () {
                    var _this = this;
                    this.clear();
                    if (this.gridCell.viewableComponentType) {
                        if (!this.cellViewContainer) {
                            return;
                        }
                        this.cdr.markForCheck();
                        var gridData = this.gridDataManager.get();
                        var gridComponent = this.gridComponentManager.get();
                        this.dcl.loadNextToLocation(this.gridCell.viewableComponentType, this.cellViewContainer, core_1.ReflectiveInjector.resolve(gridData.providerList)).then(function (componentRef) {
                            if (_this.viewComponent) {
                                _this.viewComponent.destroy();
                            }
                            _this.viewComponent = componentRef;
                            componentRef.instance.onRowInit(gridComponent, _this.gridCell, _this.rowData);
                        });
                    }
                    else if (this.gridCell.formattedData !== undefined) {
                        this.data = this.gridCell.formattedData;
                    }
                    else {
                        this.data = this.gridCell.data;
                    }
                };
                CellComponent.prototype.getScrollWidth = function () {
                    return this.el.nativeElement.scrollWidth;
                };
                CellComponent.prototype.ngOnDestroy = function () {
                    this.cellListMapManager.removeCell(this);
                    this.unregisterColumnPositionInformationMapSubscription();
                    this.unregisterActiveCellSubscription();
                };
                CellComponent.prototype.initCell = function (gridCell) {
                    this.columnIndex = gridCell.columnIndex;
                    this.style = gridCell.cellStyle;
                    var columnPositionInformationMap = this.columnPositionInformationMapManager.get();
                    this.cellPositionUpdater.update(this, columnPositionInformationMap);
                    if (gridCell.isEditing) {
                        this.goToEditMode();
                    }
                    else {
                        this.goToViewMode();
                    }
                    if (this.index === 0 && columnPositionInformationMap && columnPositionInformationMap[this.columnIndex]) {
                        this.renderer.setElementStyle(this.el.nativeElement, 'margin-left', columnPositionInformationMap[this.columnIndex].left + "px");
                    }
                    this.updadteIsActiveStatus(gridCell);
                };
                CellComponent.prototype.updadteIsActiveStatus = function (gridCell) {
                    var activeCell = this.activeCellManager.get();
                    if (!gridCell || activeCell == null) {
                        this.isActive = false;
                    }
                    else if (activeCell.rowIndex !== gridCell.rowIndex) {
                        this.isActive = false;
                    }
                    else if (activeCell.columnIndex !== gridCell.columnIndex) {
                        this.isActive = false;
                    }
                    else {
                        this.isActive = true;
                    }
                };
                CellComponent.prototype.clear = function () {
                    this.data = null;
                    if (this.unregisterEditableComponentActiveCellSubscription) {
                        this.unregisterEditableComponentActiveCellSubscription();
                    }
                    if (this.viewComponent) {
                        this.viewComponent.destroy();
                    }
                    if (this.editComponent) {
                        this.editComponent.destroy();
                    }
                    if (this.cellViewContainer) {
                        this.cellViewContainer.clear();
                    }
                };
                __decorate([
                    core_1.Input('cell'), 
                    __metadata('design:type', Object)
                ], CellComponent.prototype, "gridCell", void 0);
                __decorate([
                    core_1.Input('rowData'), 
                    __metadata('design:type', Object)
                ], CellComponent.prototype, "rowData", void 0);
                __decorate([
                    core_1.Input('index'), 
                    __metadata('design:type', Number)
                ], CellComponent.prototype, "index", void 0);
                __decorate([
                    core_1.HostBinding('style.width'), 
                    __metadata('design:type', Number)
                ], CellComponent.prototype, "width", void 0);
                __decorate([
                    core_1.HostBinding('class.is-active'), 
                    __metadata('design:type', Boolean)
                ], CellComponent.prototype, "isActive", void 0);
                __decorate([
                    core_1.HostBinding('class'), 
                    __metadata('design:type', Object)
                ], CellComponent.prototype, "style", void 0);
                __decorate([
                    core_1.ViewChild('cellComponent', { read: core_1.ViewContainerRef }), 
                    __metadata('design:type', core_1.ViewContainerRef)
                ], CellComponent.prototype, "cellViewContainer", void 0);
                __decorate([
                    core_1.HostListener('click', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], CellComponent.prototype, "onClick", null);
                __decorate([
                    core_1.HostListener('dblclick', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], CellComponent.prototype, "onDoubleClick", null);
                CellComponent = __decorate([
                    core_1.Component({
                        moduleId: module.id,
                        selector: 'GgCell',
                        template: '<GgCellComponent ref-cellComponent>{{data}}</GgCellComponent>',
                        styleUrls: ['Cell.css'],
                    }), 
                    __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ElementRef, core_1.ApplicationRef, Services_1.GridDataManager, Services_1.ColumnPositionInformationMapManager, Services_1.CellPositionUpdater, Services_1.CellListMapManager, Services_1.CellNavigator, Services_1.ActiveCellManager, core_1.ChangeDetectorRef, core_1.Renderer, core_1.ViewContainerRef, Services_1.GridComponentManager])
                ], CellComponent);
                return CellComponent;
            }());
            exports_1("CellComponent", CellComponent);
        }
    }
});
//# sourceMappingURL=CellComponent.js.map