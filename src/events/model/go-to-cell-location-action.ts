import { Action } from './action';
export class GoToCellLocationAction implements Action {
  static type = 'GoToCellLocation';
  type: string;
  payload: {
    rowIndex?: number;
    spreadsheetColumnIndex: number;
    isToUseMinimunScroll: boolean;
    isNavigation: boolean;
    rowData?: any;
  };

  constructor(rowIndex: number, spreadsheetColumnIndex: number, isToUseMinimunScroll: boolean, isNavigation: boolean = true) {
    this.type = GoToCellLocationAction.type;
    this.payload = {
      rowIndex: rowIndex,
      spreadsheetColumnIndex: spreadsheetColumnIndex,
      isToUseMinimunScroll: isToUseMinimunScroll,
      isNavigation: isNavigation,
    };
  }
}