import { Injectable } from '@angular/core';
import { SpreadsheetState } from '../spreadsheet/spreadsheet-state';
@Injectable()
export class ScrollbarDimensionsGetter {
  dimensions: { width: number; height: number; };

  constructor() {

  }

  get() {
    if (this.dimensions) {
      return this.dimensions;
    }
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.height = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    var heightNoScroll = outer.offsetHeight;
    outer.style.overflow = 'scroll';

    var inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '100%';
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;
    var heightWithScroll = inner.offsetHeight;

    outer.parentNode.removeChild(outer);

    this.dimensions = {
      width: widthNoScroll - widthWithScroll,
      height: heightNoScroll - heightWithScroll,
    };

    return this.dimensions;
  }
}