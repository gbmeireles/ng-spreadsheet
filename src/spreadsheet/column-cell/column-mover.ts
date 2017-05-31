import { Injectable, Inject, EventEmitter } from '@angular/core';
import {
  MoveColumnAction,
  DISPATCHER_TOKEN,
} from '../../events/events';
import {
  Column,
  ColumnDefinition,
} from '../../model';
import { ColumnGetter } from './column-getter';
import { SpreadsheetState } from '../../spreadsheet/spreadsheet-state';

@Injectable()
export class ColumnMover {

  constructor(private columnGetter: ColumnGetter) { }

  moveColumn(spreadsheetState: SpreadsheetState, action: MoveColumnAction): ColumnDefinition[] {
    var oldColumnIndex = action.payload.oldColumnIndex;
    var newColumnIndex = action.payload.newColumnIndex;
    if (oldColumnIndex === newColumnIndex) {
      return spreadsheetState.columnDefinitionList;
    }

    var columnList = spreadsheetState.columnList.map(i => <Column>Object.assign({}, i));
    var columnToTarget = this.columnGetter.getBySpreadsheetColumnIndex(columnList, newColumnIndex);
    var columnToMove = this.columnGetter.getBySpreadsheetColumnIndex(columnList, oldColumnIndex);

    if (!columnToMove) {
      return spreadsheetState.columnDefinitionList;
    }
    if (columnToTarget.endIndex !== columnToTarget.startIndex) {
      return spreadsheetState.columnDefinitionList;
    }
    if (columnToMove === columnToTarget) {
      return spreadsheetState.columnDefinitionList;
    }

    var columnDefinitionList = spreadsheetState.columnDefinitionList.map(i => <ColumnDefinition>Object.assign({}, i));
    var columnDefinitionToTarget = columnDefinitionList.find(cd => cd.name === columnToTarget.name);
    var columnDefinitionToMove = columnDefinitionList.find(cd => cd.name === columnToMove.name);

    var columnDefinitionIndexToMove = columnDefinitionList.indexOf(columnDefinitionToMove);
    var columnDefinitionIndexToTarget = columnDefinitionList.indexOf(columnDefinitionToTarget);
    columnDefinitionList.splice(columnDefinitionIndexToMove, 1);
    columnDefinitionList.splice(columnDefinitionIndexToTarget, 0, columnDefinitionToMove);

    return columnDefinitionList;
  }

  moveFilterExpressionMap(filterExpressionMap: { [spreadsheetColumnIndex: number]: string }, oldColumnIndex: number, newColumnIndex: number) {
    var originalFilterExpressionMap = Object.assign({}, filterExpressionMap);
    var result = Object.assign({}, filterExpressionMap);
    result[newColumnIndex] = originalFilterExpressionMap[oldColumnIndex];
    if (oldColumnIndex > newColumnIndex) {
      let index = newColumnIndex;
      while (index < oldColumnIndex) {
        result[index + 1] = originalFilterExpressionMap[index];
        index++;
      }
    } else {
      let index = oldColumnIndex;
      while (index < newColumnIndex) {
        result[index] = originalFilterExpressionMap[index + 1];
        index++;
      }
    }
    return result;
  }
}