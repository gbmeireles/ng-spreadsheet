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
} from '../Model/Model';

const html = `
<HeaderSection spreadsheetSectionName="RowNumber" 
    [columnList]="columnList"
    [spreadsheetColumnList]="spreadsheetColumnList">
    <NumberRowList [numberRowList]="numberTitleRowList" [rowHeight]="rowHeight"></NumberRowList>
</HeaderSection>
<HeaderSection *ngFor="let spreadsheetSection of spreadsheetSectionList; trackBy:spreadsheetSectionIdentity"
    [spreadsheetSectionScrollWidthMap]="spreadsheetSectionScrollWidthMap"
    [spreadsheetSectionName]="spreadsheetSection.name"
    [spreadsheetSectionPositionInformationMap]="spreadsheetSectionPositionInformationMap" 
    [columnList]="columnList"
    [spreadsheetColumnList]="spreadsheetColumnList"
    [spreadsheetSectionScrollLeftMap]="spreadsheetSectionScrollLeftMap"
    [spreadsheetSectionColumnToRendexIndexListMap]="spreadsheetSectionColumnToRendexIndexListMap"
    [columnPositionInformationMap]="columnPositionInformationMap"
    [isFilterOpenMap]="isFilterOpenMap"
    [class.is-separating-section]="spreadsheetSection !== spreadsheetSectionList[spreadsheetSectionList.length - 1]">
    <RowList [rowList]="spreadsheetSection.titleRowList" 
        [spreadsheetSectionName]="spreadsheetSection.name"
        [columnPositionInformationMap]="columnPositionInformationMap"
        [spreadsheetSectionScrollWidthMap]="spreadsheetSectionScrollWidthMap"
        [spreadsheetSectionScrollLeftMap]="spreadsheetSectionScrollLeftMap"
        [rowHeight]="rowHeight"></RowList>
</HeaderSection>
<HeaderSection spreadsheetSectionName="Scroll" [columnList]="columnList">
</HeaderSection>`;

const css = `
:host {
    display: block;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
}`;

const NUMBER_ROW_HEIGHT: number = 20;

@Component({
    selector: 'Header',
    template: html,
    styles: [css],
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