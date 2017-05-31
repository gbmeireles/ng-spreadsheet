import { Action } from './action';
export class FilterColumnAction implements Action {
  static type = 'FilterColumn';
  type: string;
  payload: {
    spreadsheetColumnIndex: number;
    expression: string;
  };

  constructor(spreadsheetColumnIndex: number, expression: string) {
    this.type = FilterColumnAction.type;
    this.payload = {
      spreadsheetColumnIndex: spreadsheetColumnIndex,
      expression: expression,
    };
  }
}