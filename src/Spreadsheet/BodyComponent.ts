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
    GridSection,
    GridRow,
    ColumnPositionInformationMap,
    GridSectionPositionInformationMap,
    CellLocation,
} from '../Model/Model';
import { BodySectionComponent } from './BodySectionComponent';
import { NumberRowListComponent } from './NumberRowListComponent';
import { RowListComponent } from './RowListComponent';

const css = `
:host {
    position: relative;
    overflow-y: hidden;
    display: block;
}`;

const html = `
<BodySection #rowNumberSection gridSectionName="RowNumber" [scrollTop]="scrollTop">
    <NumberRowList [numberRowList]="numberDataRowList" [rowHeight]="rowHeight"></NumberRowList>
    <div [style.height.px]="gridSectionList[0]?.dataRowListLength * rowHeight" style="position: absolute; width:2px; top:0;"></div>
</BodySection>
<BodySection *ngFor="let gridSection of gridSectionList; trackBy:gridSectionIdentity"
    [gridSectionName]="gridSection.name"
    [gridSectionPositionInformationMap]="gridSectionPositionInformationMap"
    [gridSectionScrollLeftMap]="gridSectionScrollLeftMap"
    [scrollTop]="scrollTop"
    [activeCellLocation]="activeCellLocation"
    [class.is-separating-section]="gridSection !== gridSectionList[gridSectionList.length - 1]"
    tabindex="0">
    <RowList [rowList]="gridSection.visibleDataRowList" 
        [gridSectionName]="gridSection.name" 
        [columnPositionInformationMap]="columnPositionInformationMap"
        [gridSectionScrollWidthMap]="gridSectionScrollWidthMap"
        [gridSectionScrollLeftMap]="gridSectionScrollLeftMap"
        [activeCellLocation]="activeCellLocation"></RowList>
    <div [style.height.px]="gridSection?.dataRowListLength * rowHeight" style="position: absolute; width:2px; top:0;"></div>
</BodySection>
<BodySection gridSectionName="Scroll" [scrollTop]="scrollTop">
    <div [style.height.px]="gridSectionList[0]?.dataRowListLength * rowHeight"></div>
</BodySection>`;

@Component({
    selector: 'Body',
    template: html,
    styles: [css],
    directives: [BodySectionComponent, NumberRowListComponent, RowListComponent],
})
export class BodyComponent implements OnInit, OnDestroy {
    @Input('scrollTop') scrollTop: number;
    @Input('gridSectionList') gridSectionList: GridSection[] = [];
    @Input('numberDataRowList') numberDataRowList: GridRow[] = [];
    @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
    @Input('gridSectionScrollWidthMap') gridSectionScrollWidthMap: { [gridSectionName: string]: number };
    @Input('gridSectionScrollLeftMap') gridSectionScrollLeftMap: { [gridSectionName: string]: number };
    @Input('gridSectionPositionInformationMap') gridSectionPositionInformationMap: GridSectionPositionInformationMap;
    @Input('rowHeight') rowHeight: number;
    @Input('activeCellLocation') activeCellLocation: CellLocation;

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

    gridSectionIdentity(index: number, gridSection: GridSection): any {
        if (gridSection) {
            return gridSection.name;
        }
        return 'gridSection_' + index;
    }
}