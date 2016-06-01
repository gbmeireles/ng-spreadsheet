import { HostBinding, HostListener, Component, Input, ElementRef, OnDestroy  } from '@angular/core';
import { Directive } from '@angular/core';

import {
    RowHeightManager,
} from '../../Services/Services';

@Directive({
    selector: 'GgHeader',
})
export class HeaderComponent implements OnDestroy {
    @HostBinding('style.height') height: number;
    @Input('rowCount') rowCount: number;

    private unsubscribeToRowHeightManagerChanges: () => void;

    constructor(private rowHeightManager: RowHeightManager) {
        this.unsubscribeToRowHeightManagerChanges =
            this.rowHeightManager.subscribe(rowHeight => this.updateHeight());
    }

    ngOnChanges() {
        this.updateHeight();
    }

    ngOnDestroy() {
        this.unsubscribeToRowHeightManagerChanges();
    }

    private updateHeight() {
        this.height = this.rowCount * this.rowHeightManager.get() + 20;
    }
}