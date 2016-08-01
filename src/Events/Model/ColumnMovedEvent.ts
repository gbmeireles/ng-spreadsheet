import { Event } from './Event';
export class ColumnMovedEvent implements Event {
    static type = 'ColumnMoved';
    type: string;
    payload: {
        newColumnIndex: number;
        oldColumnIndex: number;
    };

    constructor(newColumnIndex: number, oldColumnIndex: number) {
        this.type = ColumnMovedEvent.type;
        this.payload = {
            newColumnIndex: newColumnIndex,
            oldColumnIndex: oldColumnIndex,
        };
    }
}