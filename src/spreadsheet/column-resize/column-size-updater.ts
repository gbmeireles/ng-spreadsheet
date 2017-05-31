import { Injectable, Inject, EventEmitter } from '@angular/core';
import {
  ColumnPositionInformationMapCalculator,
} from '../../services/services';
import {
  Column,
} from '../../model';

import {
  UpdateColumnSizeAction,
} from '../../events/events';
import { SpreadsheetState } from '../spreadsheet-state';

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