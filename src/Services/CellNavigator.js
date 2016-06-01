System.register(['@angular/core', './Managers/Managers', '../Model/Model'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Managers_1, Model_1;
    var CellNavigator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Managers_1_1) {
                Managers_1 = Managers_1_1;
            },
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }],
        execute: function() {
            CellNavigator = (function () {
                function CellNavigator(cellListMapManager, columnListManager, gridSectionListManager, bodyHeightManager, bodyScrollManager, rowHeightManager, sectionPositionInformationMapManager, bodySectionScrollManager, subscriptionManager, activeCellManager, columnPositionInformationMapManager) {
                    this.cellListMapManager = cellListMapManager;
                    this.columnListManager = columnListManager;
                    this.gridSectionListManager = gridSectionListManager;
                    this.bodyHeightManager = bodyHeightManager;
                    this.bodyScrollManager = bodyScrollManager;
                    this.rowHeightManager = rowHeightManager;
                    this.sectionPositionInformationMapManager = sectionPositionInformationMapManager;
                    this.bodySectionScrollManager = bodySectionScrollManager;
                    this.subscriptionManager = subscriptionManager;
                    this.activeCellManager = activeCellManager;
                    this.columnPositionInformationMapManager = columnPositionInformationMapManager;
                    this.activeRowIndex = 0;
                    this.activeColumnIndex = 0;
                }
                CellNavigator.prototype.getCurrentActiveCellIndexData = function () {
                    return {
                        columnIndex: this.activeColumnIndex,
                        rowIndex: this.activeRowIndex,
                    };
                };
                CellNavigator.prototype.goUp = function () {
                    return this.goTo(this.activeRowIndex - 1, this.activeColumnIndex);
                };
                CellNavigator.prototype.goDown = function () {
                    return this.goTo(this.activeRowIndex + 1, this.activeColumnIndex);
                };
                CellNavigator.prototype.goLeft = function () {
                    return this.goTo(this.activeRowIndex, this.activeColumnIndex - 1);
                };
                CellNavigator.prototype.goRight = function () {
                    return this.goTo(this.activeRowIndex, this.activeColumnIndex + 1);
                };
                CellNavigator.prototype.goTo = function (targetRowIndex, targetColumnIndex) {
                    var _this = this;
                    var lastColumnIndex = this.columnListManager.get()
                        .reduce(function (index, cv) { return index > cv.endIndex ? index : cv.endIndex; }, 0);
                    var firstRowIndex = this.gridSectionListManager.get()[0].dataRowList
                        .reduce(function (index, row) { return index < row.rowIndex ? index : row.rowIndex; }, 9999999);
                    var lastRowIndex = this.gridSectionListManager.get()[0].dataRowList
                        .reduce(function (index, row) { return index > row.rowIndex ? index : row.rowIndex; }, 0);
                    var cellListMap = this.cellListMapManager.getCellListMap();
                    var movementDirection = {
                        horizontal: targetColumnIndex > this.activeColumnIndex ? 'right' : 'left',
                        vertical: targetRowIndex > this.activeRowIndex ? 'down' : 'up',
                    };
                    if (targetColumnIndex > lastColumnIndex) {
                        return;
                    }
                    if (targetColumnIndex < 0) {
                        return;
                    }
                    if (targetRowIndex > lastRowIndex) {
                        return;
                    }
                    if (targetRowIndex < firstRowIndex) {
                        return;
                    }
                    var cellList = [];
                    Object.keys(cellListMap)
                        .forEach(function (key) { return cellList = cellList.concat(cellListMap[key].filter(function (c) { return c.gridCell.cellType === Model_1.ContentTypeEnum.Data; })); });
                    var targetGridSection = this.gridSectionListManager.get()
                        .find(function (gs) { return gs.columnList.some(function (gc) { return gc.startIndex <= targetColumnIndex && gc.endIndex >= targetColumnIndex; }); });
                    var targetRow = targetGridSection.dataRowMap[targetRowIndex - firstRowIndex];
                    var targetCell = targetRow.cellList.find(function (cell) { return cell.columnIndex === targetColumnIndex; });
                    var targetCellPositionInformation = this.columnPositionInformationMapManager.get()[targetCell.columnIndex];
                    var sourceCell = cellList.find(function (cell) { return cell.gridCell.columnIndex === _this.activeColumnIndex && cell.gridCell.rowIndex === _this.activeRowIndex; });
                    if (this.activeColumnIndex === targetColumnIndex && this.activeRowIndex === targetRowIndex) {
                        return;
                    }
                    this.activeCellManager.set(targetCell);
                    this.activeColumnIndex = targetColumnIndex;
                    this.activeRowIndex = targetRowIndex;
                    if (!sourceCell) {
                        return false;
                    }
                    var scrollTop = this.bodyScrollManager.get();
                    var bodyHeight = this.bodyHeightManager.get();
                    var targetColumn = this.columnListManager.get().find(function (c) { return c.startIndex <= targetCell.columnIndex && c.endIndex >= targetCell.columnIndex; });
                    var sectionPositionInformation = this.sectionPositionInformationMapManager.get()[targetColumn.gridSectionName];
                    var width = sectionPositionInformation.width;
                    var scrollLeft = this.bodySectionScrollManager.get(targetColumn.gridSectionName);
                    var rowHeight = this.rowHeightManager.get();
                    var current = {
                        bottom: scrollTop + bodyHeight,
                        left: scrollLeft,
                        right: width + scrollLeft,
                        top: scrollTop,
                    };
                    var limits = {
                        bottom: (targetCell.rowIndex + 1) * rowHeight,
                        left: targetCellPositionInformation.left,
                        right: (targetCellPositionInformation.left + targetCellPositionInformation.width),
                        top: (targetCell.rowIndex - 1) * rowHeight,
                    };
                    if (current.bottom < limits.bottom && movementDirection.vertical === 'down') {
                        return true;
                    }
                    if (current.top > limits.top && movementDirection.vertical === 'up') {
                        return true;
                    }
                    if (current.right < limits.right && movementDirection.horizontal === 'right') {
                        return true;
                    }
                    if (current.left > limits.left && movementDirection.horizontal === 'left') {
                        return true;
                    }
                    return false;
                };
                CellNavigator = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Managers_1.CellListMapManager, Managers_1.ColumnListManager, Managers_1.GridSectionListManager, Managers_1.BodyHeightManager, Managers_1.BodyScrollManager, Managers_1.RowHeightManager, Managers_1.SectionPositionInformationMapManager, Managers_1.BodySectionScrollManager, Managers_1.SubscriptionManager, Managers_1.ActiveCellManager, Managers_1.ColumnPositionInformationMapManager])
                ], CellNavigator);
                return CellNavigator;
            })();
            exports_1("CellNavigator", CellNavigator);
        }
    }
});
//# sourceMappingURL=CellNavigator.js.map