System.register(['@angular/core', '../../../../Services/Services', 'lodash'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Services_1, _;
    var ColumnResizeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Services_1_1) {
                Services_1 = Services_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            ColumnResizeComponent = (function () {
                function ColumnResizeComponent(el, renderer, app, columnListManager, columnPositionInformationMapManager, columnPositionInformationMapCalculator, rowHeightManager, cellListMapManager) {
                    this.el = el;
                    this.renderer = renderer;
                    this.app = app;
                    this.columnListManager = columnListManager;
                    this.columnPositionInformationMapManager = columnPositionInformationMapManager;
                    this.columnPositionInformationMapCalculator = columnPositionInformationMapCalculator;
                    this.rowHeightManager = rowHeightManager;
                    this.cellListMapManager = cellListMapManager;
                    this.isDragging = false;
                    this.isInitialized = false;
                    this.originalLeft = 0;
                    this.startPosition = 0;
                    this.currentPosition = 0;
                }
                ColumnResizeComponent.prototype.updateHandlerPosition = function (columnPositionInformationMap) {
                    var columnPositionInformation = columnPositionInformationMap[this.gridColumn.index];
                    if (!columnPositionInformation) {
                        return;
                    }
                    this.left = columnPositionInformation.left + columnPositionInformation.width - Math.round(this.el.nativeElement.clientWidth / 2);
                };
                ColumnResizeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.updateHandlerPosition(this.columnPositionInformationMapManager.get());
                    this.columnInformationMapUnsubscribe = this.columnPositionInformationMapManager.subscribe(function (columnPositionInformationMap) {
                        _this.updateHandlerPosition(columnPositionInformationMap);
                    });
                    this.height = this.rowHeightManager.get();
                };
                ColumnResizeComponent.prototype.ngOnDestroy = function () {
                    this.columnInformationMapUnsubscribe();
                };
                ColumnResizeComponent.prototype.onDoubleClick = function (evt) {
                    var _this = this;
                    var columnList = _.cloneDeep(this.columnListManager.get());
                    var column = columnList.find(function (c) { return c.name == _this.gridColumn.name; });
                    if (!column) {
                        return;
                    }
                    column.width = 50;
                    var columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(columnList);
                    this.columnPositionInformationMapManager.set(columnPositionInformationMap);
                    this.app.tick();
                    column.width = this.getTargetWidth();
                    columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(columnList);
                    this.columnPositionInformationMapManager.set(columnPositionInformationMap);
                    this.columnListManager.set(columnList);
                };
                ColumnResizeComponent.prototype.getTargetWidth = function () {
                    return this.cellListMapManager.getCellList(this.gridColumn.name).reduce(function (targetWidth, cell) {
                        return Math.max(cell.getScrollWidth(), targetWidth);
                    }, 50) + 5;
                };
                ColumnResizeComponent.prototype.onMouseDown = function (evt) {
                    this.removeResizeListeners();
                    evt.preventDefault();
                    this.originalLeft = this.left;
                    this.startPosition = this.getPointerX(evt);
                    if (evt.type.indexOf('touch') === 0) {
                        this.removeMouseMoveListener = this.renderer.listenGlobal('document', 'touchmove', this.onMouseMove.bind(this));
                        this.removeMouseUpListener = this.renderer.listenGlobal('document', 'touchend', this.onMouseUp.bind(this));
                    }
                    else {
                        this.removeMouseMoveListener = this.renderer.listenGlobal('document', 'mousemove', this.onMouseMove.bind(this));
                        this.removeMouseUpListener = this.renderer.listenGlobal('document', 'mouseup', this.onMouseUp.bind(this));
                    }
                };
                ColumnResizeComponent.prototype.onMouseMove = function (evt) {
                    this.currentPosition = this.getPointerX(evt);
                    var movementX = this.currentPosition - this.startPosition;
                    if (!this.isDragging && Math.abs(movementX) > 0) {
                        this.isDragging = true;
                    }
                    this.left = this.originalLeft + movementX;
                };
                ColumnResizeComponent.prototype.onMouseUp = function (evt) {
                    var _this = this;
                    this.removeResizeListeners();
                    if (!this.isDragging) {
                        return;
                    }
                    this.isDragging = false;
                    var columnList = _.cloneDeep(this.columnListManager.get());
                    var column = columnList.find(function (c) { return c.name == _this.gridColumn.name; });
                    if (!column) {
                        return;
                    }
                    this.currentPosition = this.getPointerX(evt);
                    var columnPositionInformationMap = this.columnPositionInformationMapManager.get();
                    column.width = columnPositionInformationMap[column.startIndex].width + (this.currentPosition - this.startPosition);
                    columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(columnList);
                    this.columnPositionInformationMapManager.set(columnPositionInformationMap);
                    this.startPosition = 0;
                    this.currentPosition = 0;
                    this.columnListManager.set(columnList);
                };
                ColumnResizeComponent.prototype.removeResizeListeners = function () {
                    if (this.removeMouseUpListener) {
                        this.removeMouseUpListener();
                    }
                    if (this.removeMouseMoveListener) {
                        this.removeMouseMoveListener();
                    }
                    this.removeMouseUpListener = null;
                    this.removeMouseMoveListener = null;
                };
                ColumnResizeComponent.prototype.getPointerX = function (evt) {
                    if (evt.type.indexOf('touch') === 0) {
                        return (evt.touches[0] || evt.changedTouches[0]).pageX;
                    }
                    return evt.pageX;
                };
                __decorate([
                    core_1.Input('gridColumn'), 
                    __metadata('design:type', Object)
                ], ColumnResizeComponent.prototype, "gridColumn", void 0);
                __decorate([
                    core_1.HostListener('dblclick', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [MouseEvent]), 
                    __metadata('design:returntype', void 0)
                ], ColumnResizeComponent.prototype, "onDoubleClick", null);
                __decorate([
                    core_1.HostListener('mousedown', ['$event']),
                    core_1.HostListener('touchstart', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [MouseEvent]), 
                    __metadata('design:returntype', void 0)
                ], ColumnResizeComponent.prototype, "onMouseDown", null);
                ColumnResizeComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'GgColumnResize',
                        styleUrls: ['ColumnResize.css'],
                        template: '<div [class.active]="isDragging" [style.height]="height" [style.left]="left"></div>',
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, core_1.ApplicationRef, Services_1.ColumnListManager, Services_1.ColumnPositionInformationMapManager, Services_1.ColumnPositionInformationMapCalculator, Services_1.RowHeightManager, Services_1.CellListMapManager])
                ], ColumnResizeComponent);
                return ColumnResizeComponent;
            })();
            exports_1("ColumnResizeComponent", ColumnResizeComponent);
        }
    }
});
//# sourceMappingURL=ColumnResizeComponent.js.map