import { Component, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpreadsheetRow } from '../../model/spreadsheet-row';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `NumberRowList`,
  templateUrl: './number-row-list.component.html',
  styleUrls: ['./number-row-list.component.css'],
})
export class NumberRowListComponent {
  @Input('numberRowList') numberRowList: SpreadsheetRow[];
  @Input('rowHeight') rowHeight: number;

  rowIndentity(index: number, row: SpreadsheetRow): any {
    return index;
  }
}