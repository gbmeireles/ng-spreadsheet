import { Component, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { OnChanges, SimpleChange } from '@angular/core';
import {
  SpreadsheetRow,
  SpreadsheetCell,
  ColumnPositionInformationMap,
  CellLocation,
} from '../../model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `RowList`,
  templateUrl: './row-list.component.html',
  styleUrls: ['./row-list.component.css'],
})
export class RowListComponent {
  @Input('rowList') rowList: SpreadsheetRow[];
  @Input('rowHeight') rowHeight: number;
  @Input('spreadsheetSectionName') spreadsheetSectionName: string;
  @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
  @Input('spreadsheetSectionScrollWidthMap') spreadsheetSectionScrollWidthMap: { [spreadsheetSectionName: string]: number };
  @Input('spreadsheetSectionScrollLeftMap') spreadsheetSectionScrollLeftMap: { [spreadsheetSectionName: string]: number };
  @Input('activeCellLocation') activeCellLocation: CellLocation;
  @Input('activeRowIndexList') activeRowIndexList: number[];
  @HostBinding('style.minWidth') spreadsheetSectionScrollWidth: number;
  spreadsheetSectionScrollLeft: number;

  constructor(private cdr: ChangeDetectorRef) {

  }

  ngOnChanges(obj) {
    if (obj['spreadsheetSectionScrollWidthMap']) {
      this.spreadsheetSectionScrollWidth =
        this.spreadsheetSectionScrollWidthMap ? this.spreadsheetSectionScrollWidthMap[this.spreadsheetSectionName] : 0;
    }
    if (obj['spreadsheetSectionScrollLeftMap']) {
      this.spreadsheetSectionScrollLeft =
        this.spreadsheetSectionScrollLeftMap ? this.spreadsheetSectionScrollLeftMap[this.spreadsheetSectionName] : 0;
    }
  }

  rowIndentity(index: number, row: SpreadsheetRow): any {
    return index;
  }

  cellIdentity(index: number, cell: SpreadsheetCell): any {
    return cell ? cell.columnIndex : (-1 * index);
  }
}