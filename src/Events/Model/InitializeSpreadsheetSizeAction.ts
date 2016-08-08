import { Action } from './Action';
import { ColumnDefinition } from '../../Model/Model';
export class InitializeSpreadsheetSizeAction implements Action {
    static type = 'InitializeSpreadsheetSize';
    type: string;
    payload: {
        height: number;
        width: number;
    };

    constructor(height: number, width: number) {
        this.type = InitializeSpreadsheetSizeAction.type;
        this.payload = {
            height: height,
            width: width,
        };
    }
}