import { Component, OnInit, Inject, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import {
  Action,
  DISPATCHER_TOKEN,
  ClearFilterAction,
} from '../../events/events';
import { COLUMN_NUMBER_WIDTH } from '../../model';

@Component({
  selector: 'ColumnCornerCell',
  templateUrl: './column-corner-cell.component.html',
  styleUrls: ['./column-corner-cell.component.css'],
})
export class ColumnCornerCellComponent implements OnInit {
  @HostBinding('class.is-filtered')
  @Input('isFiltered')
  @HostBinding('style.width') width = COLUMN_NUMBER_WIDTH;
  isFiltered: boolean;

  constructor( @Inject(DISPATCHER_TOKEN) private eventEmitter: EventEmitter<Action>) { }

  ngOnInit() { }

  @HostListener('click')
  clearFilter() {
    if (this.isFiltered) {
      this.eventEmitter.emit(new ClearFilterAction());
    }
  }
}