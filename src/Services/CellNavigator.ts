import { Injectable } from '@angular/core';
import {
    CellListMapManager,
    ColumnListManager,
    GridSectionListManager,
    BodyHeightManager,
    BodyScrollManager,
    RowHeightManager,
    SectionPositionInformationMapManager,
    BodySectionScrollManager,
    ActiveCellManager,
    SubscriptionManager,
    ColumnPositionInformationMapManager,
} from './Managers/Managers';
import {
    GridCell,
    GridRow,
    Cell,
    ContentTypeEnum,
    CellIndexData,
} from '../Model/Model';

@Injectable()
export class CellNavigator {
    activeRowIndex: number = 0;
    activeColumnIndex: number = 0;

    constructor(private cellListMapManager: CellListMapManager,
        private columnListManager: ColumnListManager,
        private gridSectionListManager: GridSectionListManager,
        private bodyHeightManager: BodyHeightManager,
        private bodyScrollManager: BodyScrollManager,
        private rowHeightManager: RowHeightManager,
        private sectionPositionInformationMapManager: SectionPositionInformationMapManager,
        private bodySectionScrollManager: BodySectionScrollManager,
        private subscriptionManager: SubscriptionManager,
        private activeCellManager: ActiveCellManager,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager) {
    }

    getCurrentActiveCellIndexData(): CellIndexData {
        return {
            columnIndex: this.activeColumnIndex,
            rowIndex: this.activeRowIndex,
        };
    }

    goUp() {
        return this.goTo(this.activeRowIndex - 1, this.activeColumnIndex);
    }

    goDown() {
        return this.goTo(this.activeRowIndex + 1, this.activeColumnIndex);
    }

    goLeft() {
        return this.goTo(this.activeRowIndex, this.activeColumnIndex - 1);
    }

    goRight() {
        return this.goTo(this.activeRowIndex, this.activeColumnIndex + 1);
    }

    goTo(targetRowIndex, targetColumnIndex) {
        var lastColumnIndex = this.columnListManager.get()
            .reduce((index, cv) => { return index > cv.endIndex ? index : cv.endIndex; }, 0);
        var firstRowIndex = this.gridSectionListManager.get()[0].dataRowList
            .reduce((index, row) => { return index < row.rowIndex ? index : row.rowIndex; }, 9999999);
        var lastRowIndex = this.gridSectionListManager.get()[0].dataRowList
            .reduce((index, row) => { return index > row.rowIndex ? index : row.rowIndex; }, 0);
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

        var cellList: Cell[] = [];
        Object.keys(cellListMap)
            .forEach(key => cellList = cellList.concat(cellListMap[key].filter(c => c.gridCell.cellType === ContentTypeEnum.Data)));

        var targetGridSection = this.gridSectionListManager.get()
            .find(gs => gs.columnList.some(gc => gc.startIndex <= targetColumnIndex && gc.endIndex >= targetColumnIndex));

        var targetRow = targetGridSection.dataRowMap[targetRowIndex - firstRowIndex];
        var targetCell = targetRow.cellList.find(cell => cell.columnIndex === targetColumnIndex);
        var targetCellPositionInformation = this.columnPositionInformationMapManager.get()[targetCell.columnIndex];

        var sourceCell =
            cellList.find(cell => cell.gridCell.columnIndex === this.activeColumnIndex && cell.gridCell.rowIndex === this.activeRowIndex);

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
        var targetColumn = this.columnListManager.get().find(c => c.startIndex <= targetCell.columnIndex && c.endIndex >= targetCell.columnIndex);
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
    }
}