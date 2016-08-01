import { Event } from './Event';
export class SpreadsheetVerticallyScrolledEvent implements Event {
    static type = 'SpreadsheetVerticallyScrolled';
    type: string;
    payload: number;

    constructor(scrollTop: number) {
        this.type = SpreadsheetVerticallyScrolledEvent.type;
        this.payload = scrollTop;
    }
}