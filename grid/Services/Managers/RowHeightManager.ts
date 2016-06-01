import { Injectable } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';

@Injectable()
export class RowHeightManager {
    private rowHeight: number;

    constructor(private subscriptionManager: SubscriptionManager) {
    }

    get() {
        return this.rowHeight || 30;
    }

    set(rowHeight: number) {
        if (this.rowHeight === rowHeight) {
            return;
        }
        this.rowHeight = rowHeight;

        this.subscriptionManager.emit(`rowHeightChanged`, rowHeight);
    }

    subscribe(onChange: (rowHeight: number) => void) {
        return this.subscriptionManager.subscribe(`rowHeightChanged`, onChange);
    }
}