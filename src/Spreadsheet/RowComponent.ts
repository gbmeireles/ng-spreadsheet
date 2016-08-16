import {
    HostBinding,
    Component,
    Input,
    QueryList,
    ContentChildren,
    HostListener,
    ComponentRef,
    ChangeDetectionStrategy,
    Renderer,
    SimpleChange,
} from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { ElementRef, Host, Inject } from '@angular/core';
import {
    GridRow,
    CellLocation,
    ContentTypeEnum,
} from '../Model/Model';

const css = `:host {
    display: block;
    position: relative;
    height: 20px;
}`;

@Component({
    selector: 'Row',
    template: '<ng-content></ng-content>',
    styles: [css],
})
export class RowComponent implements OnInit, OnDestroy {
    @Input('index') index: number;
    @Input('row') row: GridRow;
    @Input('gridSectionName') gridSectionName: string;
    @Input('activeCellLocation') activeCellLocation: CellLocation;

    @Input('scrollWidth')
    @HostBinding('style.minWidth') scrollWidth: number;
    @HostBinding('class.is-active') isActive: boolean = false;

    private isInitialized: boolean;

    constructor(private el: ElementRef,
        private renderer: Renderer) {
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['row']) {
            this.updateRow(changes['row'].currentValue);
        }
        if (changes['activeCellLocation'] && this.activeCellLocation) {
            this.isActive = this.activeCellLocation.rowIndex === this.row.rowIndex;
        }
    }

    ngOnInit() {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;
        if (!this.row) {
            return;
        }
        var height = this.row.height;
        this.renderer.setElementStyle(this.el.nativeElement, 'height', `${height}px`);
    }

    ngOnDestroy() {
    }

    private updateRow(row: GridRow) {
        if (!row) {
            return;
        }
        var height = row.height;

        var top = 0;
        if (row.rowType === ContentTypeEnum.Title) {
            top = row.sectionRowIndex * height + 20;
        } else {
            top = row.sectionRowIndex * height;
        }

        if (this.index === 0 && row.rowType === ContentTypeEnum.Data) {
            this.renderer.setElementStyle(this.el.nativeElement, 'marginTop', `${top}px`);
        }

        var style = row.rowStyle;
        if (this.activeCellLocation) {
            this.isActive = this.activeCellLocation.rowIndex === this.row.rowIndex;
        }
        if (this.isActive) {
            style = style + ' is-active';
        }
        this.renderer.setElementProperty(this.el.nativeElement, 'className', style);
    }
}