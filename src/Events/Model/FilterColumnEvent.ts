import { Event } from './Event';
export class FilterColumnEvent implements Event {
    static type = 'FilterColumn';
    type: string;
    payload: {
        gridColumnIndex: number;
        expression: string;
    };

    constructor(gridColumnIndex: number, expression: string) {
        this.type = FilterColumnEvent.type;
        this.payload = {
            gridColumnIndex: gridColumnIndex,
            expression: expression,
        };
    }
}