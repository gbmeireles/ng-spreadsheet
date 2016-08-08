import { Action } from './Action';
export class FilterColumnAction implements Action {
    static type = 'FilterColumn';
    type: string;
    payload: {
        gridColumnIndex: number;
        expression: string;
    };

    constructor(gridColumnIndex: number, expression: string) {
        this.type = FilterColumnAction.type;
        this.payload = {
            gridColumnIndex: gridColumnIndex,
            expression: expression,
        };
    }
}