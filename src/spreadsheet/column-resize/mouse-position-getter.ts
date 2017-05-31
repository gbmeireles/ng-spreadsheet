import { Injectable } from '@angular/core';
import { Position } from './model/position';
@Injectable()
export class MousePositionGetter {

  constructor() { }

  getPosition(evt: TouchEvent | MouseEvent): Position {
    if (evt.type.indexOf('touch') === 0) {
      var touchEvt = <TouchEvent>evt;
      var touch = (touchEvt.touches[0] || touchEvt.changedTouches[0]);
      return {
        x: touch.pageX,
        y: touch.pageY,
      };
    }
    var mouse = (<MouseEvent>evt);
    return {
      x: mouse.pageX,
      y: mouse.pageY,
    };
  }
}