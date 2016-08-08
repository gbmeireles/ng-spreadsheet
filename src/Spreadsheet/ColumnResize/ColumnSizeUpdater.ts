import { Injectable, Inject, EventEmitter } from '@angular/core';
import {
    ColumnPositionInformationMapCalculator,
} from '../../Services/Services';
import {
    Column,
} from '../../Model/Model';

import {
    UpdateColumnSizeAction,
} from '../../Events/Events';
import { SpreadsheetState } from '../SpreadsheetState';

@Injectable()
export class ColumnSizeUpdater {

    constructor() { }

    columnSizeUpdater(spreadsheetState: SpreadsheetState, action: UpdateColumnSizeAction): Column[] {
        var columnList = spreadsheetState.columnList.slice(0).map(i => <Column>Object.assign({}, i));
        var column = columnList.find(c => c.name === action.payload.columnName);
        if (!column) {
            return;
        }

        column.width = action.payload.columnSize;

        return columnList;
    }
}