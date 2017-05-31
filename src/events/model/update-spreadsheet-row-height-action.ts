import { Action } from './action';

export class UpdateSpreadsheetRowHeightAction implements Action {
    static type = 'UpdateSpreadsheetRowHeight';
    type: string;
    payload: {
        newRowHeight: number;
    };

    constructor(newRowHeight: number) {
        this.type = UpdateSpreadsheetRowHeightAction.type;
        this.payload = {
            newRowHeight: newRowHeight,
        };
    }
}