import { HostBinding, Component, Input, ElementRef, ViewChildren, Renderer } from '@angular/core';
import { OnInit, OnDestroy, OnChanges } from '@angular/core';
import {
  Column,
  SpreadsheetColumn,
  ColumnPositionInformationMap,
} from '../../model';
import {
  ColumnIdentifierMapGetter,
} from '../../services/services';

const columnUnitList: string[] =
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

@Component({
  selector: 'ColumnRow',
  templateUrl: './column-row.component.html',
  styleUrls: ['./column-row.component.css'],
})
export class ColumnRowComponent implements OnInit, OnDestroy, OnChanges {
  @Input('spreadsheetSectionName') spreadsheetSectionName: string;
  @HostBinding('style.height') height: number;
  @Input('visibleSpreadsheetColumnList') visibleSpreadsheetColumnList: SpreadsheetColumn[];
  @Input('spreadsheetColumnList') spreadsheetColumnList: SpreadsheetColumn[];
  @Input('columnList') columnList: Column[];
  @Input('isFilterOpenMap') isFilterOpenMap: { [columnIndex: number]: boolean };
  @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;

  @Input('scrollWidth')
  @HostBinding('style.minWidth')
  scrollWidth: number;

  spreadsheetColumnIdentifierMap: { [columnIndex: number]: string } = {};

  constructor(private el: ElementRef,
    private renderer: Renderer,
    private columnIdentifierMapGetter: ColumnIdentifierMapGetter) {
  }

  cellIndentity(index: number, cell): any {
    return index;
  }

  updateColumnIdentifierList() {
    this.spreadsheetColumnIdentifierMap = this.columnIdentifierMapGetter.getMap(this.spreadsheetColumnList);
  }

  ngOnInit() {
    this.updateColumnIdentifierList();
  }

  ngOnChanges(obj) {
    if (obj['spreadsheetColumnList'] || obj['visibleSpreadsheetColumnList']) {
      this.updateColumnIdentifierList();
    }
  }

  ngOnDestroy() {
  }
}