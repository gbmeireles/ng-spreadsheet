import { Event } from './Event';
export class ColumnResizedEvent implements Event {
    static type = 'ColumnResized';
    type: string;
    payload: {
        columnName: string;
        columnSize: number;
    };

    constructor(columnName: string, columnSize: number) {
        this.type = ColumnResizedEvent.type;
        this.payload = {
            columnName: columnName,
            columnSize: columnSize
        };
    }
}