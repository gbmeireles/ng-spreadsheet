import { Action } from './Action';
import { ColumnDefinition } from '../../Model/Model';
export class UpdateColumnDefinitionListAction implements Action {
    static type = 'UpdateColumnDefinitionList';
    type: string;
    payload: {
        newColumnDefinitionList: ColumnDefinition[];
    };

    constructor(newColumnDefinitionList: ColumnDefinition[]) {
        this.type = UpdateColumnDefinitionListAction.type;
        this.payload = {
            newColumnDefinitionList: newColumnDefinitionList,
        };
    }
}