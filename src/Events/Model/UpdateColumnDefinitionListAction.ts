import { Event } from './Event';
import { ColumnDefinition } from '../../Model/Model'
export class UpdateColumnDefinitionListAction implements Event {
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