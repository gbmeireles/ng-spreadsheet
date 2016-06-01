System.register(['@angular/core', '../../../Services/Services'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Services_1;
    var BodySectionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Services_1_1) {
                Services_1 = Services_1_1;
            }],
        execute: function() {
            BodySectionComponent = (function () {
                function BodySectionComponent(el, bodyScrollManager, bodySectionScrollManager, sectionPositionInformationMapManager, cellNavigationManager, rowHeightManager, activeCellGetter, gridSectionListManager, activeCellManager, columnPositionInformationMapManager) {
                    var _this = this;
                    this.el = el;
                    this.bodyScrollManager = bodyScrollManager;
                    this.bodySectionScrollManager = bodySectionScrollManager;
                    this.sectionPositionInformationMapManager = sectionPositionInformationMapManager;
                    this.cellNavigationManager = cellNavigationManager;
                    this.rowHeightManager = rowHeightManager;
                    this.activeCellGetter = activeCellGetter;
                    this.gridSectionListManager = gridSectionListManager;
                    this.activeCellManager = activeCellManager;
                    this.columnPositionInformationMapManager = columnPositionInformationMapManager;
                    this.isInitialized = false;
                    this.sectionPositionInformatonMapUnsubscriber =
                        this.sectionPositionInformationMapManager.subscribe(function (sectionPositionInformationMap) {
                            _this.updateSectionPosition(sectionPositionInformationMap);
                        });
                    this.bodyScrollUnsubscriber = this.bodyScrollManager.subscribe(function (scrollTop) {
                        _this.scrollTop = scrollTop;
                    });
                    this.unregisterActiveCellPositionChangeSubscription = this.activeCellManager.subscribe(function (gridCell) {
                        var gridSection = gridSectionListManager.get().find(function (gc) { return gc.name === _this.gridSectionName; });
                        if (!gridSection) {
                            return;
                        }
                        var visibleGridRow = gridSection.visibleDataRowList.find(function (row) { return row.rowIndex === gridCell.rowIndex; });
                        if (!visibleGridRow) {
                            return;
                        }
                        var visibleGridCell = visibleGridRow.cellList.find(function (cell) { return cell.columnIndex === gridCell.columnIndex; });
                        if (visibleGridCell) {
                            _this.el.nativeElement.focus();
                            var visibleGridCellPosition = _this.columnPositionInformationMapManager.get()[visibleGridCell.columnIndex];
                            if (_this.el.nativeElement.scrollLeft > visibleGridCellPosition.left) {
                                _this.el.nativeElement.scrollLeft = visibleGridCellPosition.left;
                            }
                        }
                    });
                }
                BodySectionComponent.prototype.updateScrollTop = function () {
                    this._scrollTop = this.el.nativeElement.scrollTop;
                    return this._scrollTop;
                };
                Object.defineProperty(BodySectionComponent.prototype, "scrollTop", {
                    get: function () {
                        if (this._scrollTop == undefined) {
                            this._scrollTop = this.el.nativeElement.scrollTop;
                        }
                        return this._scrollTop;
                    },
                    set: function (scrollTop) {
                        if (scrollTop < 0) {
                            scrollTop = 0;
                        }
                        this._scrollTop = scrollTop;
                        this.el.nativeElement.scrollTop = this._scrollTop;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BodySectionComponent.prototype, "scrollLeft", {
                    get: function () {
                        if (this._scrollLeft == undefined) {
                            this._scrollLeft = this.el.nativeElement.scrollLeft;
                        }
                        return this._scrollLeft;
                    },
                    set: function (scrollLeft) {
                        if (scrollLeft < 0) {
                            scrollLeft = 0;
                        }
                        this._scrollLeft = scrollLeft;
                        this.el.nativeElement.scrollLeft = this._scrollLeft;
                    },
                    enumerable: true,
                    configurable: true
                });
                BodySectionComponent.prototype.updateSectionPosition = function (sectionPositionInformationMap) {
                    var sectionPositionInformation = sectionPositionInformationMap[this.gridSectionName];
                    if (!sectionPositionInformation) {
                        return;
                    }
                    this.left = sectionPositionInformation.left;
                    this.width = sectionPositionInformation.width;
                };
                BodySectionComponent.prototype.ngOnInit = function () {
                    if (this.isInitialized) {
                        return;
                    }
                    this.isInitialized = true;
                    this.updateSectionPosition(this.sectionPositionInformationMapManager.get());
                };
                BodySectionComponent.prototype.ngOnDestroy = function () {
                    this.bodyScrollUnsubscriber();
                    this.sectionPositionInformatonMapUnsubscriber();
                    this.unregisterActiveCellPositionChangeSubscription();
                };
                BodySectionComponent.prototype.onKeyUp = function (evt) {
                    var _this = this;
                    var scrollTop;
                    var scrollLeft;
                    var sourceActiveCell = this.activeCellGetter.get();
                    var targetActiveCell;
                    switch (evt.keyCode) {
                        case 27:
                            sourceActiveCell.cancelEdit();
                            this.el.nativeElement.focus();
                            break;
                        case 33:
                            scrollTop = this.scrollTop - this.el.nativeElement.clientHeight;
                            evt.preventDefault();
                            break;
                        case 34:
                            scrollTop = this.scrollTop + this.el.nativeElement.clientHeight;
                            evt.preventDefault();
                            break;
                        case 35:
                            this.el.nativeElement.style.overflowY = 'scroll';
                            scrollTop = this.el.nativeElement.scrollHeight;
                            this.el.nativeElement.style.overflowY = 'hidden';
                            evt.preventDefault();
                            break;
                        case 36:
                            scrollTop = 0;
                            evt.preventDefault();
                            break;
                        case 37:
                            if (!this.cellNavigationManager.goLeft()) {
                                evt.preventDefault();
                                return;
                            }
                            targetActiveCell = this.activeCellGetter.get();
                            if (sourceActiveCell && sourceActiveCell.sectionColumnIndex === 0) {
                                break;
                            }
                            scrollLeft = targetActiveCell.left;
                            break;
                        case 38:
                            if (!this.cellNavigationManager.goUp()) {
                                return;
                            }
                            scrollTop = this.scrollTop - this.rowHeightManager.get();
                            break;
                        case 39:
                            if (!this.cellNavigationManager.goRight()) {
                                evt.preventDefault();
                                return;
                            }
                            targetActiveCell = this.activeCellGetter.get();
                            scrollLeft = this.scrollLeft + sourceActiveCell.width;
                            break;
                        case 9:
                            evt.preventDefault();
                            var isEditing = (sourceActiveCell == null) ? false : sourceActiveCell.isEditing;
                            if (evt.shiftKey) {
                                if (this.cellNavigationManager.goLeft()) {
                                    scrollLeft = targetActiveCell.left;
                                }
                            }
                            else {
                                if (this.cellNavigationManager.goRight()) {
                                    scrollLeft = this.scrollLeft + sourceActiveCell.width;
                                }
                            }
                            setTimeout(function () {
                                targetActiveCell = _this.activeCellGetter.get();
                                if (targetActiveCell && isEditing) {
                                    targetActiveCell.goToEditMode();
                                }
                            });
                            break;
                        case 13: //Enter
                        case 40:
                            if (!this.cellNavigationManager.goDown()) {
                                return;
                            }
                            scrollTop = this.scrollTop + this.rowHeightManager.get();
                            break;
                        case 113:
                            var activeCell = this.activeCellGetter.get();
                            if (activeCell) {
                                activeCell.goToEditMode();
                            }
                            break;
                        default:
                            return;
                    }
                    evt.preventDefault();
                    if (scrollTop !== undefined) {
                        this.bodyScrollManager.set(scrollTop);
                    }
                    if (scrollLeft !== undefined) {
                        this.scrollLeft = scrollLeft;
                        this.bodySectionScrollManager.set(this.gridSectionName, scrollLeft);
                    }
                };
                BodySectionComponent.prototype.onWheel = function (evt) {
                    var scrollTop = Math.min(this.scrollTop + evt.deltaY, this.el.nativeElement.scrollHeight);
                    this.bodyScrollManager.set(scrollTop);
                };
                BodySectionComponent.prototype.onScroll = function () {
                    this.bodySectionScrollManager.set(this.gridSectionName, this.el.nativeElement.scrollLeft);
                    if (this.gridSectionName === 'Scroll') {
                        this.bodyScrollManager.set(this.el.nativeElement.scrollTop);
                    }
                };
                __decorate([
                    core_1.HostBinding('style.left'), 
                    __metadata('design:type', Number)
                ], BodySectionComponent.prototype, "left", void 0);
                __decorate([
                    core_1.HostBinding('style.width'), 
                    __metadata('design:type', Number)
                ], BodySectionComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input('gridSectionName'), 
                    __metadata('design:type', String)
                ], BodySectionComponent.prototype, "gridSectionName", void 0);
                __decorate([
                    core_1.HostListener('keydown', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [KeyboardEvent]), 
                    __metadata('design:returntype', void 0)
                ], BodySectionComponent.prototype, "onKeyUp", null);
                __decorate([
                    core_1.HostListener('wheel', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [WheelEvent]), 
                    __metadata('design:returntype', void 0)
                ], BodySectionComponent.prototype, "onWheel", null);
                __decorate([
                    core_1.HostListener('scroll', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], BodySectionComponent.prototype, "onScroll", null);
                BodySectionComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'GgBodySection',
                        styleUrls: ['BodySection.css'],
                        template: '<ng-content></ng-content>',
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, Services_1.BodyScrollManager, Services_1.BodySectionScrollManager, Services_1.SectionPositionInformationMapManager, Services_1.CellNavigator, Services_1.RowHeightManager, Services_1.ActiveCellGetter, Services_1.GridSectionListManager, Services_1.ActiveCellManager, Services_1.ColumnPositionInformationMapManager])
                ], BodySectionComponent);
                return BodySectionComponent;
            })();
            exports_1("BodySectionComponent", BodySectionComponent);
        }
    }
});
//# sourceMappingURL=BodySectionComponent.js.map