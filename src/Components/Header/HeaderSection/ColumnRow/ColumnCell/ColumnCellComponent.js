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
var Services_1 = require('../../../../../Services/Services');
var ColumnCellComponent = (function () {
    function ColumnCellComponent(el, columnPositionInformationMapManager, columnListManager, columnPositionInformationMapPositionCalculator, cellPositionUpdater, renderer) {
        var _this = this;
        this.el = el;
        this.columnPositionInformationMapManager = columnPositionInformationMapManager;
        this.columnListManager = columnListManager;
        this.columnPositionInformationMapPositionCalculator = columnPositionInformationMapPositionCalculator;
        this.cellPositionUpdater = cellPositionUpdater;
        this.renderer = renderer;
        this.isActive = false;
        this.draggable = true;
        this.columnIndex = 0;
        this.columnInformationMapUnsubscriber = this.columnPositionInformationMapManager.subscribe(function (columnPositionInformationMap) {
            _this.cellPositionUpdater.update(_this, columnPositionInformationMap);
            if (_this.index === 0) {
                _this.renderer.setElementStyle(_this.el.nativeElement, 'margin-left', columnPositionInformationMap[_this.columnIndex].left + "px");
            }
        });
    }
    ColumnCellComponent.prototype.onDragStart = function (evt) {
        var _this = this;
        ColumnCellComponent.columnList = _.cloneDeep(this.columnListManager.get());
        var columnToMove = ColumnCellComponent.columnList.find(function (c) { return c.startIndex <= _this.columnIndex && c.endIndex >= _this.columnIndex; });
        if (columnToMove.endIndex !== columnToMove.startIndex) {
            evt.preventDefault();
        }
        ColumnCellComponent.columnToMove = columnToMove;
    };
    ColumnCellComponent.prototype.onDragEnd = function (evt) {
        ColumnCellComponent.columnToMove = null;
        ColumnCellComponent.columnList = [];
    };
    ColumnCellComponent.prototype.onDragOver = function (evt) {
        var _this = this;
        var columnToTarget = ColumnCellComponent.columnList.find(function (c) { return c.startIndex <= _this.columnIndex && c.endIndex >= _this.columnIndex; });
        if (columnToTarget.endIndex !== columnToTarget.startIndex) {
            return;
        }
        evt.preventDefault();
        var columnList = ColumnCellComponent.columnList;
        var columnToMove = ColumnCellComponent.columnToMove;
        if (!columnToMove) {
            return;
        }
        var elPosition = this.el.nativeElement.getBoundingClientRect();
        var middle = elPosition.left + elPosition.width / 2;
        var columnToMoveIndex = columnList.indexOf(columnToMove);
        var columnToTargetIndex = columnList.indexOf(columnToTarget);
        if (columnToMove === columnToTarget) {
            return;
        }
        columnList.splice(columnToMoveIndex, 1);
        var toMoveIndex = 0;
        var targetIndex = 0;
        if (evt.pageX > middle) {
            columnList.splice(columnToTargetIndex + 1, 0, columnToMove);
        }
        else {
            columnList.splice(columnToTargetIndex, 0, columnToMove);
        }
    };
    ColumnCellComponent.prototype.onDrop = function (evt) {
        ColumnCellComponent.columnToMove = null;
        this.columnListManager.set(ColumnCellComponent.columnList);
    };
    ColumnCellComponent.prototype.ngOnInit = function () {
        this.columnIndex = this.gridColumn.index;
        var columnPositionInformationMap = this.columnPositionInformationMapManager.get();
        this.cellPositionUpdater.update(this, columnPositionInformationMap);
        if (this.index === 0) {
            this.renderer.setElementStyle(this.el.nativeElement, 'margin-left', columnPositionInformationMap[this.columnIndex].left + "px");
        }
    };
    ColumnCellComponent.prototype.ngOnChanges = function (changes) {
        if (changes['gridColumn']) {
            this.columnIndex = this.gridColumn.index;
            this.cellPositionUpdater.update(this, this.columnPositionInformationMapManager.get());
        }
        if (this.index === 0) {
            var columnPositionInformationMap = this.columnPositionInformationMapManager.get();
            this.renderer.setElementStyle(this.el.nativeElement, 'margin-left', columnPositionInformationMap[this.gridColumn.index].left + "px");
        }
    };
    ColumnCellComponent.prototype.ngOnDestroy = function () {
        this.columnInformationMapUnsubscriber();
    };
    ColumnCellComponent.prototype.getScrollWidth = function () {
        return this.el.nativeElement.scrollWidth;
    };
    __decorate([
        core_1.HostBinding('class.is-active'), 
        __metadata('design:type', Boolean)
    ], ColumnCellComponent.prototype, "isActive", void 0);
    __decorate([
        core_1.HostBinding('style.width'), 
        __metadata('design:type', Number)
    ], ColumnCellComponent.prototype, "width", void 0);
    __decorate([
        core_1.HostBinding('draggable'), 
        __metadata('design:type', Boolean)
    ], ColumnCellComponent.prototype, "draggable", void 0);
    __decorate([
        core_1.Input('gridColumn'), 
        __metadata('design:type', Object)
    ], ColumnCellComponent.prototype, "gridColumn", void 0);
    __decorate([
        core_1.Input('index'), 
        __metadata('design:type', Number)
    ], ColumnCellComponent.prototype, "index", void 0);
    __decorate([
        core_1.HostListener('dragstart', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [DragEvent]), 
        __metadata('design:returntype', void 0)
    ], ColumnCellComponent.prototype, "onDragStart", null);
    __decorate([
        core_1.HostListener('dragend', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [DragEvent]), 
        __metadata('design:returntype', void 0)
    ], ColumnCellComponent.prototype, "onDragEnd", null);
    __decorate([
        core_1.HostListener('dragover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [DragEvent]), 
        __metadata('design:returntype', void 0)
    ], ColumnCellComponent.prototype, "onDragOver", null);
    __decorate([
        core_1.HostListener('drop', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [DragEvent]), 
        __metadata('design:returntype', void 0)
    ], ColumnCellComponent.prototype, "onDrop", null);
    ColumnCellComponent = __decorate([
        core_1.Directive({
            selector: 'GgColumnCell',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, Services_1.ColumnPositionInformationMapManager, Services_1.ColumnListManager, Services_1.ColumnPositionInformationMapCalculator, Services_1.CellPositionUpdater, core_1.Renderer])
    ], ColumnCellComponent);
    return ColumnCellComponent;
}());
exports.ColumnCellComponent = ColumnCellComponent;
//# sourceMappingURL=ColumnCellComponent.js.map