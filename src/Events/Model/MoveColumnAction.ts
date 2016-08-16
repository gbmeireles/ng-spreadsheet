import { Action } from './Action';
export enum MoveColumnTypeEnum {
    BeforeReferenceColumn,
    AfterReferenceColumn
}

export class MoveColumnAction implements Action {
    static type = 'ColumnMoved';
    type: string;
    payload: {
        newColumnIndex: number;
        oldColumnIndex: number;
        columnToMoveName?: string;
        columnToTargeName?: string;
        moveType?: MoveColumnTypeEnum;
    };

    constructor(newColumnIndex: number,
        oldColumnIndex: number,
        columnToMoveName?: string,
        columnToTargeName?: string,
        moveType: MoveColumnTypeEnum = MoveColumnTypeEnum.AfterReferenceColumn) {
        this.type = MoveColumnAction.type;
        this.payload = {
            newColumnIndex: newColumnIndex,
            oldColumnIndex: oldColumnIndex,
            columnToMoveName: columnToMoveName,
            columnToTargeName: columnToTargeName,
            moveType: moveType,
        };
    }
}