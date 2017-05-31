import { Action } from './action';
export class UpdateColumnSizeAction implements Action {
    static type = 'ColumnResized';
    type: string;
    payload: {
        columnName: string;
        columnSize: number;
    };

    constructor(columnName: string, columnSize: number) {
        this.type = UpdateColumnSizeAction.type;
        this.payload = {
            columnName: columnName,
            columnSize: columnSize,
        };
    }
}