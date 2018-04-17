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
import { MIN_COLUMN_SIZE } from '../spreadsheet-constants';

@Injectable()
export class ColumnSizeUpdater {

  constructor() { }

  columnSizeUpdater(spreadsheetState: SpreadsheetState, action: UpdateColumnSizeAction): Column[] {
    return spreadsheetState.columnList.map(i => {
      if (i.name === action.payload.columnName) {
        return <Column>Object.assign({}, i, {
          width: Math.max(action.payload.columnSize, MIN_COLUMN_SIZE),
        });
      } else {
        return <Column>Object.assign({}, i);
      }
    });
  }
}