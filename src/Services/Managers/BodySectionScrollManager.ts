import { Injectable } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';

@Injectable()
export class BodySectionScrollManager {
    private scrollLeftMap: { [gridSectionName: string]: number };

    constructor(private subscriptionManager: SubscriptionManager) {
        this.scrollLeftMap = {};
    }

    get(gridSectionName: string) {
        return this.scrollLeftMap[gridSectionName] || 0;
    }

    set(gridSectionName: string, scrollLeft: number) {
        if (this.scrollLeftMap[gridSectionName] === scrollLeft) {
            return;
        }
        this.scrollLeftMap[gridSectionName] = scrollLeft;

        this.subscriptionManager.emit('bodySectionScroll', { gridSectionName: gridSectionName, scrollLeft: scrollLeft });
    }

    subscribe(onChange: (param: { gridSectionName: string, scrollLeft: number }) => void) {
        return this.subscriptionManager.subscribe('bodySectionScroll', onChange);
    }
}