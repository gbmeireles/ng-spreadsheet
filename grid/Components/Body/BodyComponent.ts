import { Directive, OnChanges, OnInit, ElementRef, HostListener } from '@angular/core';
import {
    BodyWidthManager,
    BodyScrollManager,
    BodyHeightManager,
    CellNavigator,
} from '../../Services/Services';

@Directive({
    selector: 'GgBody',
})
export class BodyComponent implements OnInit {
    private isInitialized: boolean;

    constructor(private el: ElementRef,
        private bodyWidthManager: BodyWidthManager,
        private bodyScrollManager: BodyScrollManager,
        private bodyHeightManager: BodyHeightManager) {
    }

    ngOnInit() {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;

        this.bodyWidthManager.set(this.getClientWidth());
        this.bodyHeightManager.set(this.getClientHeight());
    }

    getClientHeight() {
        return this.el.nativeElement.clientHeight;
    }

    getClientWidth() {
        return this.el.nativeElement.clientWidth;
    }

    @HostListener('scroll')
    onScroll() {
        this.bodyScrollManager.set(this.el.nativeElement.scrollTop);
    }
}