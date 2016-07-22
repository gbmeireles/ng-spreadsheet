import { Component, OnChanges, OnInit, ElementRef, HostListener, Input, ViewChild, SimpleChange } from '@angular/core';
import {
    BodyWidthManager,
    BodyScrollManager,
    BodyHeightManager,
    RowHeightManager,
    CellNavigator,
} from '../../Services/Services';
import { GridSection } from '../../Model/GridSection';
import { GridRow } from '../../Model/GridRow';
import { BodySectionComponent } from '../../Components/Body/BodySection/BodySectionComponent';
import { NumberRowListComponent } from '../../Components/NumberRowList/NumberRowListComponent';
import { RowListComponent } from '../../Components/RowList/RowListComponent';

@Component({
    moduleId: module.id,
    selector: 'GgBody',
    templateUrl: 'Body.html',
    styleUrls: ['Body.css'],
    directives: [BodySectionComponent, NumberRowListComponent, RowListComponent],
})
export class BodyComponent implements OnInit {
    @Input('gridSectionList') gridSectionList: GridSection[] = [];
    @Input('numberDataRowList') numberDataRowList: GridRow[] = [];
    @ViewChild(BodySectionComponent) rowNumberSection: BodySectionComponent;
    rowHeight: number;
    private isInitialized: boolean;

    constructor(private el: ElementRef,
        private bodyWidthManager: BodyWidthManager,
        private bodyScrollManager: BodyScrollManager,
        private bodyHeightManager: BodyHeightManager,
        private rowHeightManager: RowHeightManager) {
        this.rowHeight = this.rowHeightManager.get();
        this.rowHeightManager.subscribe((rowHeight) => {
            this.rowHeight = rowHeight;
        });
    }

    ngOnInit() {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;

        this.bodyWidthManager.set(this.el.nativeElement.clientWidth);
        this.bodyHeightManager.set(this.el.nativeElement.clientHeight);
    }

    updateScrollTop() {
        if (this.rowNumberSection) {
            this.bodyScrollManager.set(this.rowNumberSection.updateScrollTop());
        }
    }

    gridSectionIdentity(index: number, gridSection: GridSection): any {
        if (gridSection) {
            return gridSection.name;
        }
        return 'gridSection_' + index;
    }

    @HostListener('scroll')
    onScroll() {
        this.bodyScrollManager.set(this.el.nativeElement.scrollTop);
    }
}