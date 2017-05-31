import { Action } from './action';
export class ScrollSpreadsheetAction implements Action {
    static type = 'SpreadsheetVerticallyScrolled';
    type: string;
    payload: number;

    constructor(scrollTop: number) {
        this.type = ScrollSpreadsheetAction.type;
        this.payload = scrollTop;
    }
}