import { Action } from './action';
export class ClearFilterAction implements Action {
  static type = 'ClearFilter';
  type: string;

  constructor() {
    this.type = ClearFilterAction.type;
  }
}