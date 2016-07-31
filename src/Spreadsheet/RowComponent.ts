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
import { ElementRef, Host, Inject, forwardRef } from '@angular/core';
import { GridRow } from '../Model/GridRow';
import { ContentTypeEnum } from '../Model/ContentTypeEnum';
import {
    BodySectionScrollWidthManager,
} from '../Services/Services';

const css = `:host {
    display: block;
    position: relative;
    height: 20px;
}`;

@Component({
    selector: 'GgRow',
    template: '<ng-content></ng-content>',
    styles: [css],
})
export class RowComponent implements OnInit, OnDestroy {
    @Input('index') index: number;
    @Input('row') row: GridRow;
    @Input('gridSectionName') gridSectionName: string;

    private isInitialized: boolean;
    private unregisterScrollWidthSubscription: () => void;

    constructor(private el: ElementRef,
        private bodySectionScrollWidthManager: BodySectionScrollWidthManager,
        private renderer: Renderer) {
        this.unregisterScrollWidthSubscription = this.bodySectionScrollWidthManager.subscribe((response) => {
            if (response.gridSectionName === this.gridSectionName) {
                this.renderer.setElementStyle(this.el.nativeElement, 'minWidth', `${response.width}px`);
            }
        });
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['row']) {
            this.updateRow(changes['row'].currentValue);
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
        var width = this.bodySectionScrollWidthManager.get(this.gridSectionName);
        this.renderer.setElementStyle(this.el.nativeElement, 'minWidth', `${width}px`);
        this.renderer.setElementStyle(this.el.nativeElement, 'height', `${height}px`);
    }

    ngOnDestroy() {
        this.unregisterScrollWidthSubscription();
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
        } else if (row.rowType === ContentTypeEnum.Title) {
            // this.renderer.setElementStyle(this.el.nativeElement, 'top', `${top}px`);
        }

        var style = row.rowStyle;
        this.renderer.setElementProperty(this.el.nativeElement, 'className', style);
        // this.renderer.setElementClass(this.el.nativeElement, style, false);
    }
}