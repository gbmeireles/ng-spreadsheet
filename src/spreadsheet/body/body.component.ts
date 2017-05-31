import {
  Component,
  OnChanges,
  OnInit,
  OnDestroy,
  HostBinding,
  ElementRef,
  HostListener,
  Renderer,
  Input,
  ViewChild,
  SimpleChange,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  SpreadsheetSection,
  SpreadsheetRow,
  ColumnPositionInformationMap,
  SpreadsheetSectionPositionInformationMap,
  CellLocation,
} from '../../model';

@Component({
  selector: 'Body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent implements OnInit, OnDestroy {
  @Input('scrollTop') scrollTop: number;
  @Input('spreadsheetSectionList') spreadsheetSectionList: SpreadsheetSection[] = [];
  @Input('numberDataRowList') numberDataRowList: SpreadsheetRow[] = [];
  @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
  @Input('spreadsheetSectionScrollWidthMap') spreadsheetSectionScrollWidthMap: { [spreadsheetSectionName: string]: number };
  @Input('spreadsheetSectionScrollLeftMap') spreadsheetSectionScrollLeftMap: { [spreadsheetSectionName: string]: number };
  @Input('spreadsheetSectionPositionInformationMap') spreadsheetSectionPositionInformationMap: SpreadsheetSectionPositionInformationMap;
  @Input('rowHeight') rowHeight: number;
  @Input('activeCellLocation') activeCellLocation: CellLocation;
  @Input('activeRowIndexList') activeRowIndexList: number[];

  @HostBinding('style.height')
  @HostBinding('style.maxHeight')
  @Input('height')
  height: number = 400;

  private isInitialized: boolean;

  constructor(private el: ElementRef,
    private renderer: Renderer) {
  }

  ngOnInit() {
    if (this.isInitialized) {
      return;
    }
    this.isInitialized = true;
  }

  ngOnChanges(obj) {
    if (obj.columnPositionInformationMap) {

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
}