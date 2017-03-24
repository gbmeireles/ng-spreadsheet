import { Injectable, Inject, EventEmitter } from '@angular/core';
import { SpreadsheetState } from './SpreadsheetState';
import {
    ColumnListGetter,
    SpreadsheetSectionListGetter,
    SpreadsheetColumnListGetter,
    ColumnPositionInformationMapCalculator,
    SpreadsheetSectionScrollWidthMapCalculator,
    ColumnViewportUpdater,
    RowViewportUpdater,
    SectionPositionInformationMapCalculator,
    NumberTitleRowListGetter,
    NumberDataRowListGetter,
    ColumnToRenderIndexListGetter,
    SpreadsheetSectionDataRowMapGetter,
    NumberFilter,
    FilteredDataRowListGetter,
    CellLocationRelativeToViewportGetter,
    DataSpreadsheetRowListGetter,
    TitleSpreadsheetRowListGetter,
} from '../Services/Services';
import {
    DISPATCHER_TOKEN,
    DISPATCHER_PROVIDERS,
    Action,
    MoveColumnAction,
    UpdateColumnSizeAction,
    ScrollSpreadsheetSectionAction,
    ScrollSpreadsheetAction,
    FilterColumnAction,
    UpdateColumnDefinitionListAction,
    UpdateDataRowListAction,
    InitializeSpreadsheetSizeAction,
    UpdateSpreadsheetRowHeightAction,
    UpdateSpreadsheetSizeAction,
    UpdateSpreadsheetGetRowStyleFnAction,
    GoToCellLocationAction,
    ClearFilterAction,
    ToggleFilterAction,
} from '../Events/Events';
import { SpreadsheetCell, SpreadsheetRow } from '../Model/Model';
import { ColumnMover } from './ColumnCell/ColumnMover';
import { ColumnSizeUpdater } from './ColumnResize/ColumnSizeUpdater';

const statusBarHeight = 20;
const detailsBarHeight = 36;

@Injectable()
export class SpreadsheetStore {
    spreadsheetState: SpreadsheetState;
    onChanged: EventEmitter<SpreadsheetState> = new EventEmitter<SpreadsheetState>(false);

    constructor( @Inject(DISPATCHER_TOKEN) private dispatcher: EventEmitter<any>,
        private columnListGetter: ColumnListGetter,
        private spreadsheetSectionListGetter: SpreadsheetSectionListGetter,
        private spreadsheetColumnListGetter: SpreadsheetColumnListGetter,
        private columnPositionInformationMapCalculator: ColumnPositionInformationMapCalculator,
        private spreadsheetSectionScrollWidthMapCalculator: SpreadsheetSectionScrollWidthMapCalculator,
        private columnViewportUpdater: ColumnViewportUpdater,
        private columnMover: ColumnMover,
        private rowViewportUpdater: RowViewportUpdater,
        private columnSizeUpdater: ColumnSizeUpdater,
        private sectionPositionInformationMapCalculator: SectionPositionInformationMapCalculator,
        private numberTitleRowListGetter: NumberTitleRowListGetter,
        private numberDataRowListGetter: NumberDataRowListGetter,
        private columnToRenderIndexListGetter: ColumnToRenderIndexListGetter,
        private spreadsheetSectionDataRowMapGetter: SpreadsheetSectionDataRowMapGetter,
        private numberFilter: NumberFilter,
        private filteredDataRowListGetter: FilteredDataRowListGetter,
        private cellLocationRelativeToViewportGetter: CellLocationRelativeToViewportGetter,
        private dataSpreadsheetRowListGetter: DataSpreadsheetRowListGetter,
        private titleSpreadsheetRowListGetter: TitleSpreadsheetRowListGetter,
    ) {
        this.spreadsheetState = new SpreadsheetState();
        this.dispatcher.subscribe((action: Action) => {
            if (window['isToLogSpreadsheetEvents']) {
                console.time('SpreadsheetAction');
                console.log(`Action requested: ${action.type}`);
            }
            switch (action.type) {
                case UpdateColumnDefinitionListAction.type: {
                    this.spreadsheetState = this.updateColumnDefinitionList(<UpdateColumnDefinitionListAction>action);
                    break;
                }
                case ToggleFilterAction.type: {
                    this.spreadsheetState = this.toggleFilter(<ToggleFilterAction>action);
                    break;
                }
                case UpdateDataRowListAction.type: {
                    this.spreadsheetState = this.updateDataRowList(<UpdateDataRowListAction>action);
                    break;
                }
                case MoveColumnAction.type: {
                    this.spreadsheetState = this.moveColumn(<MoveColumnAction>action);
                    break;
                }
                case UpdateColumnSizeAction.type: {
                    this.spreadsheetState = this.resizeColumn(<UpdateColumnSizeAction>action);
                    break;
                }
                case ScrollSpreadsheetSectionAction.type: {
                    this.spreadsheetState = this.scrollSpreadsheetSection(<ScrollSpreadsheetSectionAction>action);
                    break;
                }
                case ScrollSpreadsheetAction.type: {
                    this.spreadsheetState = this.scrollSpreadsheet(<ScrollSpreadsheetAction>action);
                    break;
                }
                case InitializeSpreadsheetSizeAction.type: {
                    this.spreadsheetState = this.initializeSpreadsheetSize(<InitializeSpreadsheetSizeAction>action);
                    break;
                }
                case UpdateSpreadsheetRowHeightAction.type: {
                    this.spreadsheetState = this.updateRowHeight(<UpdateSpreadsheetRowHeightAction>action);
                    break;
                }
                case UpdateSpreadsheetGetRowStyleFnAction.type: {
                    this.spreadsheetState = this.updateRowStyleFn(<UpdateSpreadsheetGetRowStyleFnAction>action);
                    break;
                }
                case UpdateSpreadsheetSizeAction.type: {
                    this.spreadsheetState = this.updateSpreadsheetSize(<UpdateSpreadsheetSizeAction>action);
                    break;
                }
                case FilterColumnAction.type: {
                    this.spreadsheetState = this.filterSpreadsheetData(<FilterColumnAction>action);
                    break;
                }
                case GoToCellLocationAction.type: {
                    this.spreadsheetState = this.goToCellLocation(<GoToCellLocationAction>action);
                    break;
                }
                case ClearFilterAction.type: {
                    this.spreadsheetState = this.clearFilter(<ClearFilterAction>action);
                    break;
                }
            }
            if (window['isToLogSpreadsheetEvents']) {
                console.log(`Action executed: ${action.type}`);
                console.timeEnd('SpreadsheetAction');
            }
            this.onChanged.emit(this.spreadsheetState);
        });
    }

    private goToCellLocation(action: GoToCellLocationAction) {
        if (action.payload.spreadsheetColumnIndex === this.spreadsheetState.activeCellLocation.columnIndex
            && action.payload.rowIndex === this.spreadsheetState.activeCellLocation.rowIndex) {
            return this.spreadsheetState;
        }
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);

        var firstRowIndex = spreadsheetState.numberTitleRowList.length;
        var lastRowIndex = spreadsheetState.numberDataRowList.reduce((pv, cv) => Math.max(cv.rowIndex, pv), 0);
        var firstColumnIndex = spreadsheetState.spreadsheetColumnList.reduce((pv, cv) => Math.min(cv.index, pv), 999999999);
        var lastColumnIndex = spreadsheetState.spreadsheetColumnList.reduce((pv, cv) => Math.max(cv.index, pv), 0);
        if (action.payload.rowIndex <= lastRowIndex
            && action.payload.rowIndex >= firstRowIndex
            && action.payload.spreadsheetColumnIndex <= lastColumnIndex
            && action.payload.spreadsheetColumnIndex >= firstColumnIndex) {
            spreadsheetState.activeCellLocation = {
                columnIndex: action.payload.spreadsheetColumnIndex,
                rowIndex: action.payload.rowIndex,
            };
        }

        var activeCellLocation = spreadsheetState.activeCellLocation;

        var dataRowListLength = spreadsheetState.dataSpreadsheetRowList.length;
        var dataRowIndex = 0;
        var targetRow: SpreadsheetRow;
        var targetCell: SpreadsheetCell;
        while (dataRowIndex < dataRowListLength) {
            var row = spreadsheetState.dataSpreadsheetRowList[dataRowIndex];
            dataRowIndex++;

            if (row.rowIndex > activeCellLocation.rowIndex) {
                break;
            }

            var cell =
                row.cellList.find(c => {
                    var isInTargetRowRange = (c.rowIndex + c.rowspan - 1) >= activeCellLocation.rowIndex && c.rowIndex <= activeCellLocation.rowIndex;

                    if (!isInTargetRowRange) {
                        return false;
                    }
                    var isInTargetColumnRange =
                        (c.columnIndex + c.colspan - 1) >= activeCellLocation.columnIndex && c.columnIndex <= activeCellLocation.columnIndex;

                    return isInTargetColumnRange;
                });

            if (cell) {
                targetRow = row;
                targetCell = cell;
                break;
            }
        }

        if (!targetCell && action.payload.rowData === undefined) {
            return spreadsheetState;
        }

        spreadsheetState.activeCellLocation = {
            columnIndex: targetCell ? targetCell.columnIndex : action.payload.spreadsheetColumnIndex,
            rowIndex: targetCell ? targetCell.rowIndex : action.payload.rowIndex,
        };

        spreadsheetState.activeRowIndexList = spreadsheetState.dataSpreadsheetRowList
            .filter(sRow => sRow.rowData === (action.payload.rowData !== undefined ? action.payload.rowData : targetRow.rowData))
            .map(sRow => sRow.rowIndex);

        var relative = this.cellLocationRelativeToViewportGetter.get(spreadsheetState, spreadsheetState.activeCellLocation);
        if (relative.isOutsideViewport) {
            var targetSpreadsheetColumn = spreadsheetState.spreadsheetColumnList.find(gc => gc.index === action.payload.spreadsheetColumnIndex);

            if (relative.isOutsideViewportVertically) {
                var targetScrollTop = action.payload.isToUseMinimunScroll ?
                    spreadsheetState.scrollTop + (relative.top <= 0 ? relative.top : relative.bottom) :
                    action.payload.rowIndex * spreadsheetState.rowHeight;
                spreadsheetState.scrollTop = Math.max(targetScrollTop, 0);
            }
            if (relative.isOutsideViewportHorizontally) {
                var targetScrollLeft = action.payload.isToUseMinimunScroll ?
                    spreadsheetState.spreadsheetSectionScrollLeftMap[targetSpreadsheetColumn.sectionName] +
                    (relative.left <= 0 ? relative.left : relative.right) :
                    spreadsheetState.columnPositionInformationMap[targetSpreadsheetColumn.index].left;
                spreadsheetState.spreadsheetSectionScrollLeftMap = Object.assign({}, spreadsheetState.spreadsheetSectionScrollLeftMap);
                spreadsheetState.spreadsheetSectionScrollLeftMap[targetSpreadsheetColumn.sectionName] = Math.max(targetScrollLeft, 0);
                spreadsheetState.spreadsheetSectionList = this.columnViewportUpdater.update(spreadsheetState, targetSpreadsheetColumn.sectionName);
            }
            spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
            spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
            spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

            if (relative.isOutsideViewportHorizontally) {
                spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
                spreadsheetState.spreadsheetSectionList.forEach(gs => {
                    if (targetSpreadsheetColumn.sectionName === gs.name) {
                        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                            this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
                    } else {
                        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                            this.spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name];
                    }
                });
            }
        }

        return spreadsheetState;
    }

    private initializeSpreadsheetSize(action: InitializeSpreadsheetSizeAction) {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        let evt = <InitializeSpreadsheetSizeAction>action;
        spreadsheetState.spreadsheetWidth = evt.payload.width;
        spreadsheetState.bodyHeight = evt.payload.height;
        return spreadsheetState;
    }

    private filterSpreadsheetData(action: FilterColumnAction) {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        spreadsheetState.dataRowList = spreadsheetState.originalDataRowList.slice(0);

        spreadsheetState.spreadsheetColumnList = spreadsheetState.spreadsheetColumnList.slice(0);
        var spreadsheetColumn = spreadsheetState.spreadsheetColumnList.find(gc => gc.index === action.payload.spreadsheetColumnIndex);
        var spreadsheetColumnIndex = spreadsheetState.spreadsheetColumnList.indexOf(spreadsheetColumn);
        spreadsheetColumn = Object.assign({}, spreadsheetColumn, { filterExpression: action.payload.expression });
        spreadsheetState.spreadsheetColumnList.splice(spreadsheetColumnIndex, 1, spreadsheetColumn);

        spreadsheetState.filterExpressionMap[action.payload.spreadsheetColumnIndex] = action.payload.expression;
        spreadsheetState.dataRowList = this.filteredDataRowListGetter.getList(spreadsheetState);
        spreadsheetState.dataSpreadsheetRowList =
            this.dataSpreadsheetRowListGetter.get(spreadsheetState, spreadsheetState.titleSpreadsheetRowList.length);

        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

        return spreadsheetState;
    }

    private clearFilter(action: ClearFilterAction) {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        spreadsheetState.dataRowList = spreadsheetState.originalDataRowList.slice(0);

        spreadsheetState.filterExpressionMap = {};
        spreadsheetState.spreadsheetColumnList =
            this.spreadsheetColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);
        spreadsheetState.dataRowList = this.filteredDataRowListGetter.getList(spreadsheetState);
        spreadsheetState.dataSpreadsheetRowList =
            this.dataSpreadsheetRowListGetter.get(spreadsheetState, spreadsheetState.titleSpreadsheetRowList.length);

        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

        return spreadsheetState;
    }

    private updateRowStyleFn(action: UpdateSpreadsheetGetRowStyleFnAction) {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        spreadsheetState.getRowStyle = action.payload.newGetRowStyleFn;

        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);

        return spreadsheetState;
    }

    private updateSpreadsheetSize(action: UpdateSpreadsheetSizeAction) {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);

        var headerHeight = spreadsheetState.numberTitleRowList.length * spreadsheetState.rowHeight + 20;
        spreadsheetState.spreadsheetWidth = action.payload.newWidth;
        spreadsheetState.totalHeight = action.payload.newHeight;
        var bodyHeight = Math.max(spreadsheetState.totalHeight - headerHeight - statusBarHeight - detailsBarHeight, spreadsheetState.rowHeight * 3);
        spreadsheetState.bodyHeight = bodyHeight;

        spreadsheetState.spreadsheetSectionPositionInformationMap = this.sectionPositionInformationMapCalculator.calculate(spreadsheetState);

        spreadsheetState.spreadsheetSectionList.slice(0).forEach(gs => {
            spreadsheetState.spreadsheetSectionList = this.columnViewportUpdater.update(spreadsheetState, gs.name);
        });
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);
        spreadsheetState.spreadsheetSectionScrollWidthMap = this.spreadsheetSectionScrollWidthMapCalculator.calculate(spreadsheetState);

        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionList.forEach(gs => {
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });

        return spreadsheetState;
    }

    private updateRowHeight(action: UpdateSpreadsheetRowHeightAction) {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);

        spreadsheetState.rowHeight = action.payload.newRowHeight;
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

        return spreadsheetState;
    }

    private scrollSpreadsheet(action: ScrollSpreadsheetAction): SpreadsheetState {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        var maxScrollTop = spreadsheetState.spreadsheetSectionList.length > 0 ?
            ((spreadsheetState.spreadsheetSectionList[0].dataRowListLength + 1) * spreadsheetState.rowHeight - spreadsheetState.bodyHeight)
            : 999999999;
        var newScrollTop = Math.min(Math.max(action.payload, 0), Math.max(maxScrollTop, 0));

        if (spreadsheetState.scrollTop === newScrollTop) {
            return spreadsheetState;
        }

        spreadsheetState.scrollTop = newScrollTop;
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

        return spreadsheetState;
    }

    private scrollSpreadsheetSection(action: ScrollSpreadsheetSectionAction): SpreadsheetState {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        spreadsheetState.spreadsheetSectionScrollLeftMap = Object.assign({}, spreadsheetState.spreadsheetSectionScrollLeftMap);
        spreadsheetState.spreadsheetSectionScrollLeftMap[action.payload.sectionName] = Math.min(action.payload.scrollLeft);
        spreadsheetState.spreadsheetSectionList = this.columnViewportUpdater.update(spreadsheetState, action.payload.sectionName);
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionList.forEach(gs => {
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });

        return spreadsheetState;
    }

    private moveColumn(action: MoveColumnAction): SpreadsheetState {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        spreadsheetState.columnDefinitionList = this.columnMover.moveColumn(spreadsheetState, action);
        spreadsheetState.columnList = this.columnListGetter.get(spreadsheetState.columnDefinitionList);

        spreadsheetState.filterExpressionMap =
            this.columnMover.moveFilterExpressionMap(spreadsheetState.filterExpressionMap,
                action.payload.oldColumnIndex, action.payload.newColumnIndex);

        spreadsheetState.spreadsheetColumnList =
            this.spreadsheetColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);
        spreadsheetState.columnPositionInformationMap =
            this.columnPositionInformationMapCalculator.calculate(spreadsheetState.spreadsheetColumnList);

        var spreadsheetColumn = spreadsheetState.spreadsheetColumnList.find(gc => gc.index === action.payload.newColumnIndex);

        spreadsheetState.titleSpreadsheetRowList = this.titleSpreadsheetRowListGetter.get(spreadsheetState);
        spreadsheetState.dataSpreadsheetRowList =
            this.dataSpreadsheetRowListGetter.get(spreadsheetState, spreadsheetState.titleSpreadsheetRowList.length);

        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        spreadsheetState.spreadsheetSectionList = this.columnViewportUpdater.update(spreadsheetState, spreadsheetColumn.sectionName);
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionList.forEach(gs => {
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });

        return spreadsheetState;
    };

    private resizeColumn(action: UpdateColumnSizeAction): SpreadsheetState {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        var columnList = this.columnSizeUpdater.columnSizeUpdater(spreadsheetState, action);
        if (spreadsheetState.columnList === columnList) {
            return this.spreadsheetState;
        }

        spreadsheetState.columnList = columnList;
        spreadsheetState.spreadsheetColumnList =
            this.spreadsheetColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);
        spreadsheetState.columnPositionInformationMap =
            this.columnPositionInformationMapCalculator.calculate(spreadsheetState.spreadsheetColumnList);
        spreadsheetState.spreadsheetSectionScrollWidthMap = this.spreadsheetSectionScrollWidthMapCalculator.calculate(spreadsheetState);
        spreadsheetState.spreadsheetSectionPositionInformationMap = this.sectionPositionInformationMapCalculator.calculate(spreadsheetState);

        spreadsheetState.spreadsheetSectionList.map(gs => gs.name).forEach(spreadsheetSectionName => {
            spreadsheetState.spreadsheetSectionList = this.columnViewportUpdater.update(spreadsheetState, spreadsheetSectionName);
        });

        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionList.forEach(gs => {
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });

        return spreadsheetState;
    }

    private toggleFilter(action: ToggleFilterAction): SpreadsheetState {
        var spreadsheetState = <SpreadsheetState>Object.assign(new SpreadsheetState(), this.spreadsheetState);

        var columnIndex = action.payload.columnIndex;
        spreadsheetState.isFilterOpenMap[columnIndex] = !spreadsheetState.isFilterOpenMap[columnIndex];

        return spreadsheetState;
    }

    private updateColumnDefinitionList(action: UpdateColumnDefinitionListAction): SpreadsheetState {
        if (action.payload.newColumnDefinitionList === this.spreadsheetState.columnDefinitionList) {
            return this.spreadsheetState;
        }
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);

        spreadsheetState.columnDefinitionList = action.payload.newColumnDefinitionList || [];
        spreadsheetState.columnList = this.columnListGetter.get(spreadsheetState.columnDefinitionList);

        spreadsheetState.spreadsheetColumnList =
            this.spreadsheetColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);

        spreadsheetState.titleSpreadsheetRowList = this.titleSpreadsheetRowListGetter.get(spreadsheetState);
        spreadsheetState.dataSpreadsheetRowList =
            this.dataSpreadsheetRowListGetter.get(spreadsheetState, spreadsheetState.titleSpreadsheetRowList.length);

        var headerHeight = (spreadsheetState.titleSpreadsheetRowList.length * spreadsheetState.rowHeight + 20) || 0;
        var bodyHeight = Math.max(spreadsheetState.totalHeight - headerHeight - statusBarHeight - detailsBarHeight, spreadsheetState.rowHeight * 3);
        spreadsheetState.bodyHeight = bodyHeight;

        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        spreadsheetState.columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(spreadsheetState.spreadsheetColumnList);
        spreadsheetState.spreadsheetSectionPositionInformationMap = this.sectionPositionInformationMapCalculator.calculate(spreadsheetState);
        spreadsheetState.spreadsheetSectionScrollWidthMap = this.spreadsheetSectionScrollWidthMapCalculator.calculate(spreadsheetState);
        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionScrollLeftMap = Object.assign({}, spreadsheetState.spreadsheetSectionScrollLeftMap);
        spreadsheetState.spreadsheetSectionList.forEach(gs => {
            if (!spreadsheetState.spreadsheetSectionScrollLeftMap[gs.name]) {
                spreadsheetState.spreadsheetSectionScrollLeftMap[gs.name] = 0;
            }
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });

        spreadsheetState.spreadsheetSectionList.forEach(gs => {
            spreadsheetState.spreadsheetSectionList = this.columnViewportUpdater.update(spreadsheetState, gs.name);
        });
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        return spreadsheetState;
    }

    private updateDataRowList(action: UpdateDataRowListAction) {
        if (action.payload.newDataRowList === this.spreadsheetState.dataRowList) {
            return this.spreadsheetState;
        }
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        spreadsheetState.originalDataRowList = (action.payload.newDataRowList || []).slice(0);
        spreadsheetState.dataRowList = action.payload.newDataRowList || [];
        spreadsheetState.dataRowList = this.filteredDataRowListGetter.getList(spreadsheetState);

        spreadsheetState.titleSpreadsheetRowList = this.titleSpreadsheetRowListGetter.get(spreadsheetState);
        spreadsheetState.dataSpreadsheetRowList =
            this.dataSpreadsheetRowListGetter.get(spreadsheetState, spreadsheetState.titleSpreadsheetRowList.length);

        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

        spreadsheetState.spreadsheetSectionList.forEach(ss => {
            spreadsheetState.spreadsheetSectionList = this.columnViewportUpdater.update(spreadsheetState, ss.name);
        });
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionList.forEach(gs => {
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });

        return spreadsheetState;
    }
}