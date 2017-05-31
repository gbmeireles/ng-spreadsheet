import {
  HostBinding,
  HostListener,
  Component,
  Input,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  SpreadsheetSection,
  Column,
  SpreadsheetRow,
  ColumnPositionInformationMap,
  SpreadsheetSectionPositionInformationMap,
  SpreadsheetColumn,
} from '../../model';

const NUMBER_ROW_HEIGHT: number = 20;

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  @HostBinding('style.height') height: number;
  @Input('numberTitleRowList') numberTitleRowList: SpreadsheetRow[];
  @Input('spreadsheetSectionList') spreadsheetSectionList: SpreadsheetSection[];
  @Input('spreadsheetColumnList') spreadsheetColumnList: SpreadsheetColumn[];
  @Input('columnList') columnList: Column[];
  @Input('rowHeight') rowHeight: number;
  @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
  @Input('spreadsheetSectionScrollWidthMap') spreadsheetSectionScrollWidthMap: { [spreadsheetSectionName: string]: number };
  @Input('spreadsheetSectionScrollLeftMap') spreadsheetSectionScrollLeftMap: { [spreadsheetSectionName: string]: number };
  @Input('spreadsheetSectionPositionInformationMap') spreadsheetSectionPositionInformationMap: SpreadsheetSectionPositionInformationMap;
  @Input('isFilterOpenMap') isFilterOpenMap: { [columnIndex: number]: boolean };
  @Input('spreadsheetSectionColumnToRendexIndexListMap')
  spreadsheetSectionColumnToRendexIndexListMap: { [spreadsheetSectionName: string]: number[] };

  constructor() {
  }

  ngOnChanges(obj) {
    if (obj['numberTitleRowList'] || obj['rowHeight']) {
      this.updateHeight();
    }
  }

  ngOnDestroy() {
  }

  spreadsheetSectionIdentity(index: number, spreadsheetSection: SpreadsheetSection): any {
    if (spreadsheetSection) {
      return spreadsheetSection.name;
    }
    return 'spreadsheetSection_' + index;
  }

  private updateHeight() {
    this.height = this.numberTitleRowList.length * this.rowHeight + NUMBER_ROW_HEIGHT;
  }
}