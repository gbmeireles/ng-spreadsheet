import { Action } from './action';
import { ContentTypeEnum } from '../../model';

export class UpdateSpreadsheetGetRowStyleFnAction implements Action {
  static type = 'UpdateSpreadsheetGetRowStyleFn';
  type: string;
  payload: {
    newGetRowStyleFn: (dataRow, rowType: ContentTypeEnum, rowIndex: number) => string;
  };

  constructor(newGetRowStyleFn: (dataRow, rowType: ContentTypeEnum, rowIndex: number) => string) {
    this.type = UpdateSpreadsheetGetRowStyleFnAction.type;
    this.payload = {
      newGetRowStyleFn: newGetRowStyleFn,
    };
  }
}