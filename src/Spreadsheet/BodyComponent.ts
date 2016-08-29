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
} from '@angular/core';
import {
    SpreadsheetSection,
    SpreadsheetRow,
    ColumnPositionInformationMap,
    SpreadsheetSectionPositionInformationMap,
    CellLocation,
} from '../Model/Model';

const css = `
:host {
    position: relative;
    overflow-y: hidden;
    display: block;
    height: 400px;
}`;

const html = `
<BodySection #rowNumberSection spreadsheetSectionName="RowNumber" [scrollTop]="scrollTop">
    <NumberRowList [numberRowList]="numberDataRowList" [rowHeight]="rowHeight"></NumberRowList>
    <div [style.height.px]="spreadsheetSectionList[0]?.dataRowListLength * rowHeight" style="position: absolute; width:2px; top:0;"></div>
</BodySection>
<BodySection *ngFor="let spreadsheetSection of spreadsheetSectionList; trackBy:spreadsheetSectionIdentity"
    [spreadsheetSectionName]="spreadsheetSection.name"
    [spreadsheetSectionPositionInformationMap]="spreadsheetSectionPositionInformationMap"
    [spreadsheetSectionScrollLeftMap]="spreadsheetSectionScrollLeftMap"
    [scrollTop]="scrollTop"
    [activeCellLocation]="activeCellLocation"
    [class.is-separating-section]="spreadsheetSection !== spreadsheetSectionList[spreadsheetSectionList.length - 1]"
    tabindex="0">
    <RowList [rowList]="spreadsheetSection.visibleDataRowList" 
        [spreadsheetSectionName]="spreadsheetSection.name" 
        [columnPositionInformationMap]="columnPositionInformationMap"
        [spreadsheetSectionScrollWidthMap]="spreadsheetSectionScrollWidthMap"
        [spreadsheetSectionScrollLeftMap]="spreadsheetSectionScrollLeftMap"
        [activeCellLocation]="activeCellLocation"
        [rowHeight]="rowHeight"
        [activeRowIndexList]="activeRowIndexList"></RowList>
    <div [style.height.px]="spreadsheetSection?.dataRowListLength * rowHeight" style="position: absolute; width:2px; top:0;"></div>
</BodySection>
<BodySection spreadsheetSectionName="Scroll" [scrollTop]="scrollTop">
    <div [style.height.px]="spreadsheetSectionList[0]?.dataRowListLength * rowHeight"></div>
</BodySection>`;

@Component({
    selector: 'Body',
    template: html,
    styles: [css],
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