import { Injectable, Inject, EventEmitter } from '@angular/core';
import {
    MoveColumnAction,
    DISPATCHER_TOKEN,
} from '../../Events/Events';
import {
    Column,
} from '../../Model/Model';
import { ColumnGetter } from './ColumnGetter';
import { SpreadsheetState } from '../../Spreadsheet/SpreadsheetState';

@Injectable()
export class ColumnMover {

    constructor(private columnGetter: ColumnGetter) { }

    moveColumn(spreadsheetState: SpreadsheetState, action: MoveColumnAction): Column[] {
        var oldColumnIndex = action.payload.oldColumnIndex;
        var newColumnIndex = action.payload.newColumnIndex;
        if (oldColumnIndex === newColumnIndex) {
            return spreadsheetState.columnList;
        }

        var columnList = spreadsheetState.columnList.slice(0).map(i => <Column>Object.assign({}, i));
        var columnToTarget = this.columnGetter.getByGridColumnIndex(columnList, newColumnIndex);
        var columnToMove = this.columnGetter.getByGridColumnIndex(columnList, oldColumnIndex);

        if (!columnToMove) {
            return spreadsheetState.columnList;
        }
        if (columnToTarget.endIndex !== columnToTarget.startIndex) {
            return spreadsheetState.columnList;
        }
        if (columnToMove === columnToTarget) {
            return spreadsheetState.columnList;
        }

        if (newColumnIndex > oldColumnIndex) {
            columnList.filter(c => c.startIndex >= oldColumnIndex && c.startIndex <= newColumnIndex).forEach(c => {
                c.startIndex--;
                c.endIndex--;
            });

        } else {
            columnList.filter(c => c.startIndex >= newColumnIndex && c.startIndex <= oldColumnIndex).forEach(c => {
                c.startIndex++;
                c.endIndex++;
            });
        }
        columnToMove.startIndex = newColumnIndex;
        columnToMove.endIndex = newColumnIndex;

        columnList.splice(oldColumnIndex, 1);
        columnList.splice(newColumnIndex, 0, columnToMove);

        return columnList;
    }

    moveFilterExpressionMap(filterExpressionMap: { [gridColumnIndex: number]: string }, oldColumnIndex: number, newColumnIndex: number) {
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