import { Action } from './Action';

export class UpdateSpreadsheetSizeAction implements Action {
    static type = 'UpdateSpreadsheetHeight';
    type: string;
    payload: {
        newHeight: number;
        newWidth: number;
    };

    constructor(newHeight: number, newWidth: number) {
        this.type = UpdateSpreadsheetSizeAction.type;
        this.payload = {
            newHeight: newHeight,
            newWidth: newWidth
        };
    }
}