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
<GgBodySection #rowNumberSection gridSectionName="RowNumber" [scrollTop]="scrollTop">
    <GgNumberRowList [numberRowList]="numberDataRowList" [rowHeight]="rowHeight"></GgNumberRowList>
    <div [style.height.px]="gridSectionList[0]?.dataRowListLength * rowHeight" style="position: absolute; width:2px; top:0;"></div>
</GgBodySection>
<GgBodySection *ngFor="let gridSection of gridSectionList; trackBy:gridSectionIdentity"
    [gridSectionName]="gridSection.name"
    [gridSectionPositionInformationMap]="gridSectionPositionInformationMap"
    [gridSectionScrollLeftMap]="gridSectionScrollLeftMap"
    [scrollTop]="scrollTop"
    [activeCellLocation]="activeCellLocation"
    tabindex="0">
    <GgRowList [rowList]="gridSection.visibleDataRowList" 
        [gridSectionName]="gridSection.name" 
        [columnPositionInformationMap]="columnPositionInformationMap"
        [gridSectionScrollWidthMap]="gridSectionScrollWidthMap"
        [gridSectionScrollLeftMap]="gridSectionScrollLeftMap"
        [activeCellLocation]="activeCellLocation"></GgRowList>
    <div [style.height.px]="gridSection?.dataRowListLength * rowHeight" style="position: absolute; width:2px; top:0;"></div>
</GgBodySection>
<GgBodySection gridSectionName="Scroll" [scrollTop]="scrollTop">
    <div [style.height.px]="gridSectionList[0]?.dataRowListLength * rowHeight"></div>
</GgBodySection>`;

@Component({
    selector: 'GgBody',
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