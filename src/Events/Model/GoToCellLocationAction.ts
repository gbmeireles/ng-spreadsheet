import { Action } from './Action';
export class GoToCellLocationAction implements Action {
    static type = 'GoToCellLocation';
    type: string;
    payload: {
        rowIndex?: number;
        spreadsheetColumnIndex: number;
        isToUseMinimunScroll: boolean;
        rowData?: any;
    };

    constructor(rowIndex: number, spreadsheetColumnIndex: number, isToUseMinimunScroll: boolean) {
        this.type = GoToCellLocationAction.type;
        this.payload = {
            rowIndex: rowIndex,
            spreadsheetColumnIndex: spreadsheetColumnIndex,
            isToUseMinimunScroll: isToUseMinimunScroll,
        };
    }
}