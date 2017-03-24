import { Action } from './Action';

export class ToggleFilterAction implements Action {
    static type = 'ToggleFilter';
    type: string;
    payload: {
        columnIndex: number;
    };

    constructor(columnIndex: number) {
        this.type = ToggleFilterAction.type;
        this.payload = {
            columnIndex: columnIndex,
        };
    }
}