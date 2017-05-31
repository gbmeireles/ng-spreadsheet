import { Action } from './action';

export class UpdateSpreadsheetRowHeightAction implements Action {
  static type = 'UpdateSpreadsheetRowHeight';
  type: string;
  payload: {
    newDataRowHeight: number;
    newTitleRowHeight: number;
  };

  constructor(newDataRowHeight: number, newTitleRowHeight: number) {
    this.type = UpdateSpreadsheetRowHeightAction.type;
    this.payload = {
      newDataRowHeight: newDataRowHeight,
      newTitleRowHeight: newTitleRowHeight,
    };
  }
}