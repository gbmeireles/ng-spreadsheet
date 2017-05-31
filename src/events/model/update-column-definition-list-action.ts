import { Action } from './action';
import { ColumnDefinition } from '../../model';
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