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
} from '../Events/Events';
import { ColumnMover } from './ColumnCell/ColumnMover';
import { ColumnSizeUpdater } from './ColumnResize/ColumnSizeUpdater';
@Injectable()
export class SpreadsheetStore {
    spreadsheetState: SpreadsheetState;
    onChanged: EventEmitter<SpreadsheetState> = new EventEmitter<SpreadsheetState>(false);

    constructor( @Inject(DISPATCHER_TOKEN) private dispatcher: EventEmitter<any>,
        private columnListGetter: ColumnListGetter,
        private gridSectionListGetter: SpreadsheetSectionListGetter,
        private gridColumnListGetter: SpreadsheetColumnListGetter,
        private columnPositionInformationMapCalculator: ColumnPositionInformationMapCalculator,
        private gridSectionScrollWidthMapCalculator: SpreadsheetSectionScrollWidthMapCalculator,
        private columnViewportUpdater: ColumnViewportUpdater,
        private columnMover: ColumnMover,
        private rowViewportUpdater: RowViewportUpdater,
        private columnSizeUpdater: ColumnSizeUpdater,
        private sectionPositionInformationMapCalculator: SectionPositionInformationMapCalculator,
        private numberTitleRowListGetter: NumberTitleRowListGetter,
        private numberDataRowListGetter: NumberDataRowListGetter,
        private columnToRenderIndexListGetter: ColumnToRenderIndexListGetter,
        private gridSectionDataRowMapGetter: SpreadsheetSectionDataRowMapGetter,
        private numberFilter: NumberFilter,
        private filteredDataRowListGetter: FilteredDataRowListGetter,
        private cellLocationRelativeToViewportGetter: CellLocationRelativeToViewportGetter,
    ) {
        this.spreadsheetState = new SpreadsheetState();
        this.dispatcher.subscribe((action: Action) => {
            console.time('SpreadsheetAction');
            console.log(`Action requested: ${action.type}`);
            switch (action.type) {
                case UpdateColumnDefinitionListAction.type: {
                    this.spreadsheetState = this.updateColumnDefinitionList(<UpdateColumnDefinitionListAction>action);
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
                    this.spreadsheetState = this.scrollGridSection(<ScrollSpreadsheetSectionAction>action);
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
            console.log(`Action executed: ${action.type}`);
            console.timeEnd('SpreadsheetAction');
            this.onChanged.emit(this.spreadsheetState);
        });
    }

    private goToCellLocation(action: GoToCellLocationAction) {
        if (action.payload.gridColumnIndex === this.spreadsheetState.activeCellLocation.gridColumnIndex
            && action.payload.rowIndex === this.spreadsheetState.activeCellLocation.rowIndex) {
            return this.spreadsheetState;
        }
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);

        var firstRowIndex = spreadsheetState.numberTitleRowList.length;
        var lastRowIndex = spreadsheetState.numberDataRowList.reduce((pv, cv) => Math.max(cv.rowIndex, pv), 0);
        var firstColumnIndex = spreadsheetState.gridColumnList.reduce((pv, cv) => Math.min(cv.index, pv), 999999999);
        var lastColumnIndex = spreadsheetState.gridColumnList.reduce((pv, cv) => Math.max(cv.index, pv), 0);
        if (action.payload.rowIndex <= lastRowIndex
            && action.payload.rowIndex >= firstRowIndex
            && action.payload.gridColumnIndex <= lastColumnIndex
            && action.payload.gridColumnIndex >= firstColumnIndex) {
            spreadsheetState.activeCellLocation = { gridColumnIndex: action.payload.gridColumnIndex, rowIndex: action.payload.rowIndex };
        }

        var relative = this.cellLocationRelativeToViewportGetter.get(spreadsheetState, spreadsheetState.activeCellLocation);
        if (relative.isOutsideViewport) {
            var targetGridColumn = spreadsheetState.gridColumnList.find(gc => gc.index === action.payload.gridColumnIndex);

            if (relative.isOutsideViewportVertically) {
                var targetScrollTop = action.payload.isToUseMinimunScroll ?
                    spreadsheetState.scrollTop + (relative.top <= 0 ? relative.top : relative.bottom) :
                    action.payload.rowIndex * spreadsheetState.rowHeight;
                spreadsheetState.scrollTop = Math.max(targetScrollTop, 0);
            }
            if (relative.isOutsideViewportHorizontally) {
                var targetScrollLeft = action.payload.isToUseMinimunScroll ?
                    spreadsheetState.gridSectionScrollLeftMap[targetGridColumn.gridSectionName] +
                    (relative.left <= 0 ? relative.left : relative.right) :
                    spreadsheetState.columnPositionInformationMap[targetGridColumn.index].left;
                spreadsheetState.gridSectionScrollLeftMap = Object.assign({}, spreadsheetState.gridSectionScrollLeftMap);
                spreadsheetState.gridSectionScrollLeftMap[targetGridColumn.gridSectionName] = Math.max(targetScrollLeft, 0);
                spreadsheetState.gridSectionList = this.columnViewportUpdater.update(spreadsheetState, targetGridColumn.gridSectionName);
            }
            spreadsheetState.gridSectionList = this.rowViewportUpdater.update(spreadsheetState);
            spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
            spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

            if (relative.isOutsideViewportHorizontally) {
                spreadsheetState.gridSectionColumnToRendexIndexListMap = {};
                spreadsheetState.gridSectionList.forEach(gs => {
                    if (targetGridColumn.gridSectionName === gs.name) {
                        spreadsheetState.gridSectionColumnToRendexIndexListMap[gs.name] =
                            this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
                    } else {
                        spreadsheetState.gridSectionColumnToRendexIndexListMap[gs.name] =
                            this.spreadsheetState.gridSectionColumnToRendexIndexListMap[gs.name];
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

        spreadsheetState.gridColumnList = spreadsheetState.gridColumnList.slice(0);
        var gridColumn = spreadsheetState.gridColumnList.find(gc => gc.index === action.payload.gridColumnIndex);
        var gridColumnIndex = spreadsheetState.gridColumnList.indexOf(gridColumn);
        gridColumn = Object.assign({}, gridColumn, { filterExpression: action.payload.expression });
        spreadsheetState.gridColumnList.splice(gridColumnIndex, 1, gridColumn);

        spreadsheetState.filterExpressionMap[action.payload.gridColumnIndex] = action.payload.expression;
        spreadsheetState.dataRowList = this.filteredDataRowListGetter.getList(spreadsheetState);

        spreadsheetState.gridSectionList = this.gridSectionListGetter.get(spreadsheetState);
        spreadsheetState.gridSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

        return spreadsheetState;
    }

    private clearFilter(action: ClearFilterAction) {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        spreadsheetState.dataRowList = spreadsheetState.originalDataRowList.slice(0);

        spreadsheetState.filterExpressionMap = {};
        spreadsheetState.gridColumnList = this.gridColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);
        spreadsheetState.dataRowList = this.filteredDataRowListGetter.getList(spreadsheetState);

        spreadsheetState.gridSectionList = this.gridSectionListGetter.get(spreadsheetState);
        spreadsheetState.gridSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

        return spreadsheetState;
    }

    private updateRowStyleFn(action: UpdateSpreadsheetGetRowStyleFnAction) {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        spreadsheetState.getRowStyle = action.payload.newGetRowStyleFn;

        spreadsheetState.gridSectionList = this.gridSectionListGetter.get(spreadsheetState);

        return spreadsheetState;
    }

    private updateSpreadsheetSize(action: UpdateSpreadsheetSizeAction) {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);

        var headerHeight = spreadsheetState.numberTitleRowList.length * spreadsheetState.rowHeight + 20;
        var statusBarHeight = 20;
        var bodyHeight = action.payload.newHeight - headerHeight - statusBarHeight;
        spreadsheetState.spreadsheetWidth = action.payload.newWidth;
        spreadsheetState.bodyHeight = bodyHeight;

        spreadsheetState.gridSectionPositionInformationMap = this.sectionPositionInformationMapCalculator.calculate(spreadsheetState);

        spreadsheetState.gridSectionList.slice(0).forEach(gs => {
            spreadsheetState.gridSectionList = this.columnViewportUpdater.update(spreadsheetState, gs.name);
        });
        spreadsheetState.gridSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);
        spreadsheetState.gridSectionScrollWidthMap = this.gridSectionScrollWidthMapCalculator.calculate(spreadsheetState);

        spreadsheetState.gridSectionColumnToRendexIndexListMap = {};
        spreadsheetState.gridSectionList.forEach(gs => {
            spreadsheetState.gridSectionColumnToRendexIndexListMap[gs.name] =
                this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });

        return spreadsheetState;
    }

    private updateRowHeight(action: UpdateSpreadsheetRowHeightAction) {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);

        spreadsheetState.rowHeight = action.payload.newRowHeight;
        spreadsheetState.gridSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

        return spreadsheetState;
    }

    private scrollSpreadsheet(action: ScrollSpreadsheetAction): SpreadsheetState {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        var maxScrollTop = spreadsheetState.gridSectionList.length > 0 ?
            ((spreadsheetState.gridSectionList[0].dataRowListLength + 1) * spreadsheetState.rowHeight - spreadsheetState.bodyHeight)
            : 999999999;
        spreadsheetState.scrollTop = Math.min(Math.max(action.payload, 0), Math.max(maxScrollTop, 0));
        spreadsheetState.gridSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

        return spreadsheetState;
    }

    private scrollGridSection(action: ScrollSpreadsheetSectionAction): SpreadsheetState {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        spreadsheetState.gridSectionScrollLeftMap = Object.assign({}, spreadsheetState.gridSectionScrollLeftMap);
        spreadsheetState.gridSectionScrollLeftMap[action.payload.sectionName] = Math.min(action.payload.scrollLeft);
        spreadsheetState.gridSectionList = this.columnViewportUpdater.update(spreadsheetState, action.payload.sectionName);
        spreadsheetState.gridSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.gridSectionColumnToRendexIndexListMap = {};
        spreadsheetState.gridSectionList.forEach(gs => {
            spreadsheetState.gridSectionColumnToRendexIndexListMap[gs.name] =
                this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });

        return spreadsheetState;
    }

    private moveColumn(action: MoveColumnAction): SpreadsheetState {
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);
        spreadsheetState.columnList = this.columnMover.moveColumn(spreadsheetState, action);
        spreadsheetState.filterExpressionMap =
            this.columnMover.moveFilterExpressionMap(spreadsheetState.filterExpressionMap,
                action.payload.oldColumnIndex, action.payload.newColumnIndex);

        spreadsheetState.gridColumnList = this.gridColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);
        spreadsheetState.columnPositionInformationMap =
            this.columnPositionInformationMapCalculator.calculate(spreadsheetState.gridColumnList);

        var gridColumn = spreadsheetState.gridColumnList.find(gc => gc.index === action.payload.newColumnIndex);

        spreadsheetState.gridSectionList = this.gridSectionListGetter.get(spreadsheetState);
        spreadsheetState.gridSectionColumnToRendexIndexListMap = {};
        spreadsheetState.gridSectionList.forEach(gs => {
            spreadsheetState.gridSectionColumnToRendexIndexListMap[gs.name] =
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
        spreadsheetState.gridColumnList = this.gridColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);
        spreadsheetState.columnPositionInformationMap =
            this.columnPositionInformationMapCalculator.calculate(spreadsheetState.gridColumnList);
        spreadsheetState.gridSectionScrollWidthMap = this.gridSectionScrollWidthMapCalculator.calculate(spreadsheetState);
        spreadsheetState.gridSectionPositionInformationMap = this.sectionPositionInformationMapCalculator.calculate(spreadsheetState);

        spreadsheetState.gridSectionList.map(gs => gs.name).forEach(gridSectionName => {
            spreadsheetState.gridSectionList = this.columnViewportUpdater.update(spreadsheetState, gridSectionName);
        });

        spreadsheetState.gridSectionColumnToRendexIndexListMap = {};
        spreadsheetState.gridSectionList.forEach(gs => {
            spreadsheetState.gridSectionColumnToRendexIndexListMap[gs.name] =
                this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });

        return spreadsheetState;
    }

    private updateColumnDefinitionList(action: UpdateColumnDefinitionListAction): SpreadsheetState {
        if (action.payload.newColumnDefinitionList === this.spreadsheetState.columnDefinitionList) {
            return this.spreadsheetState;
        }
        var spreadsheetState = <SpreadsheetState>Object.assign({}, this.spreadsheetState);

        spreadsheetState.columnDefinitionList = action.payload.newColumnDefinitionList || [];
        spreadsheetState.columnList = this.columnListGetter.get(spreadsheetState.columnDefinitionList);
        spreadsheetState.gridColumnList = this.gridColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);
        spreadsheetState.gridSectionList = this.gridSectionListGetter.get(spreadsheetState);
        spreadsheetState.columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(spreadsheetState.gridColumnList);
        spreadsheetState.gridSectionPositionInformationMap = this.sectionPositionInformationMapCalculator.calculate(spreadsheetState);
        spreadsheetState.gridSectionScrollWidthMap = this.gridSectionScrollWidthMapCalculator.calculate(spreadsheetState);
        spreadsheetState.gridSectionColumnToRendexIndexListMap = {};
        spreadsheetState.gridSectionScrollLeftMap = Object.assign({}, spreadsheetState.gridSectionScrollLeftMap);
        spreadsheetState.gridSectionList.forEach(gs => {
            spreadsheetState.gridSectionList = this.columnViewportUpdater.update(spreadsheetState, gs.name);
        });
        spreadsheetState.gridSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.gridSectionList.forEach(gs => {
            if (!spreadsheetState.gridSectionScrollLeftMap[gs.name]) {
                spreadsheetState.gridSectionScrollLeftMap[gs.name] = 0;
            }
            spreadsheetState.gridSectionColumnToRendexIndexListMap[gs.name] =
                this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });
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
        spreadsheetState.gridSectionList = this.gridSectionListGetter.get(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);

        return spreadsheetState;
    }
}