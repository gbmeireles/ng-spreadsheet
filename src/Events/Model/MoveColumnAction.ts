import { Action } from './Action';
export class MoveColumnAction implements Action {
    static type = 'ColumnMoved';
    type: string;
    payload: {
        newColumnIndex: number;
        oldColumnIndex: number;
    };

    constructor(newColumnIndex: number, oldColumnIndex: number) {
        this.type = MoveColumnAction.type;
        this.payload = {
            newColumnIndex: newColumnIndex,
            oldColumnIndex: oldColumnIndex,
        };
    }
}