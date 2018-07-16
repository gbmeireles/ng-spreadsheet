import { Action } from './action';
export class SetIsToShowStatusBarAction implements Action {
  static type = 'SetIsToShowStatusBar';
  type: string;
  payload: boolean;

  constructor(isToShowStatusBar: boolean) {
    this.type = SetIsToShowStatusBarAction.type;
    this.payload = isToShowStatusBar;
  }
}