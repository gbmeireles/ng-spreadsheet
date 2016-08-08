import { Action } from './Action';

export class UpdateDataRowListAction implements Action {
    static type = 'UpdateDataRowList';
    type: string;
    payload: {
        newDataRowList: any[];
    };

    constructor(newDataRowList: any[]) {
        this.type = UpdateDataRowListAction.type;
        this.payload = {
            newDataRowList: newDataRowList,
        };
    }
}