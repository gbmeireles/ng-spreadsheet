import { Injectable } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';

@Injectable()
export class BodyScrollManager {
    private _scrollTop: number;
    private timeoutId: number;

    constructor(private subscriptionManager: SubscriptionManager) {
    }

    get() {
        return this._scrollTop || 0;
    }

    set(scrollTop: number) {
        scrollTop = Math.max(scrollTop, 0);
        if (this._scrollTop === scrollTop) {
            return;
        }
        this._scrollTop = scrollTop;

        this.subscriptionManager.emit('bodyScroll', this._scrollTop);
    }

    triggerUpdate() {
        this.subscriptionManager.emit('bodyScroll', this._scrollTop);
    }

    subscribe(onChange) {
        return this.subscriptionManager.subscribe('bodyScroll', onChange);
    }
}