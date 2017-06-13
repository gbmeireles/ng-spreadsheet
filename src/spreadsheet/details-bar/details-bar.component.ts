import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellManager, ColumnIdentifierMapGetter } from '../../services/services';
import { CellLocation, SpreadsheetColumn } from '../../model';
import { Subject } from 'rxjs';

@Component({
  selector: 'DetailsBar',
  templateUrl: './details-bar.component.html',
  styleUrls: ['./details-bar.component.css'],
})
export class DetailsBarComponent implements OnInit {
  @Input('activeCellLocation') activeCellLocation: CellLocation;
  @Input('spreadsheetColumnList') spreadsheetColumnList: SpreadsheetColumn[];
  @Input('defaultMessage') defaultMessage: string;
  @Output('download') onDownload: Subject<void> = new Subject<void>();
  @Output('toggleFullScreen') onToggleFullScreen: Subject<boolean> = new Subject<boolean>();

  private activeCellData: string;
  private columnIdentifierMap: { [spreadsheetColumnIndex: number]: string } = {};
  private cellLocation: string = '--';
  private isFull: boolean = false;

  constructor(private cellManager: CellManager,
    private columnIdentifierMapGetter: ColumnIdentifierMapGetter) { }

  ngOnInit() {
  }

  ngOnChanges(obj) {
    this.activeCellData = this.activeCellData || this.defaultMessage;
    if (obj['spreadsheetColumnList']) {
      this.columnIdentifierMap = this.columnIdentifierMapGetter.getMap(this.spreadsheetColumnList);
    }
    if (obj['activeCellLocation']) {
      var activeCell = this.cellManager.getCellListBySpreadsheetColumnIndex(this.activeCellLocation.columnIndex)
        .find(cell => cell.spreadsheetCell && cell.spreadsheetCell.rowIndex === this.activeCellLocation.rowIndex);
      if (!activeCell) {
        return;
      }
      var spreadsheetCell = activeCell.spreadsheetCell;
      if (spreadsheetCell.formatData == undefined) {
        this.activeCellData = spreadsheetCell.data;
      } else {
        this.activeCellData = spreadsheetCell.formatData(spreadsheetCell.data);
      }
      this.cellLocation = this.columnIdentifierMap[this.activeCellLocation.columnIndex] + (spreadsheetCell.rowIndex + 1);
    }
  }

  toggleFullScreen() {
    this.isFull = !this.isFull;
    this.onToggleFullScreen.next(this.isFull);
  }

}