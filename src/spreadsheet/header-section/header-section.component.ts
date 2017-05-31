import { Inject, EventEmitter, HostBinding, HostListener, Component, Input, ElementRef } from '@angular/core';
import { OnInit, OnDestroy, OnChanges } from '@angular/core';
import {
  ColumnToRenderIndexListGetter,
} from '../../services/services';
import {
  DISPATCHER_TOKEN,
  Action,
  UpdateColumnSizeAction,
  ClearFilterAction,
} from '../../events/events';

import {
  SpreadsheetSectionPositionInformationMap,
  SpreadsheetColumn,
  SpreadsheetRowListMap,
  SpreadsheetRow,
  Column,
  ColumnPositionInformationMap,
  COLUMN_NUMBER_WIDTH,
} from '../../model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'HeaderSection',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css'],
})
export class HeaderSectionComponent implements OnDestroy, OnInit {
  @HostBinding('style.left') left: number;
  @HostBinding('style.width') width: number;
  @Input('spreadsheetSectionScrollWidthMap') spreadsheetSectionScrollWidthMap: { [spreadsheetSectionName: string]: number };
  @Input('spreadsheetSectionName') spreadsheetSectionName: string;
  @Input('rowHeight') rowHeight: string;
  @Input('columnList') columnList: Column[];
  @Input('isFilterOpenMap') isFilterOpenMap: { [columnIndex: number]: boolean };
  @Input('spreadsheetColumnList') spreadsheetColumnList: SpreadsheetColumn[];
  @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
  @Input('spreadsheetSectionPositionInformationMap') spreadsheetSectionPositionInformationMap: SpreadsheetSectionPositionInformationMap;
  @Input('spreadsheetSectionColumnToRendexIndexListMap')
  spreadsheetSectionColumnToRendexIndexListMap: { [spreadsheetSectionName: string]: number[] };
  @Input('spreadsheetSectionScrollLeftMap') spreadsheetSectionScrollLeftMap: { [spreadsheetSectionName: string]: number };

  scrollWidth: number;
  visibleSpreadsheetColumnList: SpreadsheetColumn[];
  isFiltered: boolean = false;

  constructor(private el: ElementRef,
    @Inject(DISPATCHER_TOKEN) private eventEmitter: EventEmitter<Action>) {
  }

  ngOnInit() {
  }

  ngOnChanges(obj) {
    if (obj['spreadsheetSectionPositionInformationMap']) {
      var spreadsheetSectionPositionInformation =
        this.spreadsheetSectionPositionInformationMap && this.spreadsheetSectionPositionInformationMap[this.spreadsheetSectionName];
      if (spreadsheetSectionPositionInformation) {
        this.left = spreadsheetSectionPositionInformation.left;
        this.width = spreadsheetSectionPositionInformation.width;
      }
    }
    if (this.spreadsheetSectionName === 'RowNumber') {
      this.width = COLUMN_NUMBER_WIDTH;
    }
    if (obj['spreadsheetSectionColumnToRendexIndexListMap'] || obj['spreadsheetColumnList']) {
      var spreadsheetSectionColumnToRendexIndexList = this.spreadsheetSectionColumnToRendexIndexListMap
        && this.spreadsheetSectionColumnToRendexIndexListMap[this.spreadsheetSectionName];
      if (spreadsheetSectionColumnToRendexIndexList) {
        this.visibleSpreadsheetColumnList =
          this.spreadsheetColumnList.filter(gc => spreadsheetSectionColumnToRendexIndexList.indexOf(gc.index) >= 0);
      }
    }
    if (obj['spreadsheetSectionScrollWidthMap']) {
      this.scrollWidth = this.spreadsheetSectionScrollWidthMap && this.spreadsheetSectionScrollWidthMap[this.spreadsheetSectionName];
    }
    if (obj['spreadsheetSectionScrollLeftMap']) {
      this.el.nativeElement.scrollLeft =
        this.spreadsheetSectionScrollLeftMap && this.spreadsheetSectionScrollLeftMap[this.spreadsheetSectionName];
    }
    if (obj['spreadsheetColumnList']) {
      this.isFiltered = this.spreadsheetColumnList.some(gc => gc.filterExpression && gc.filterExpression.length > 0);
    }
  }

  ngOnDestroy() {
  }
}