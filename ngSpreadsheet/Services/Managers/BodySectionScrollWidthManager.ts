import { Injectable } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';

@Injectable()
export class BodySectionScrollWidthManager {
    gridSectionScrollWidthMap: { [gridSectionName: string]: number };

    constructor(private subscriptionManager: SubscriptionManager) {
        this.gridSectionScrollWidthMap = {};
    }

    set(gridSectionName: string, width: number) {
        if (this.gridSectionScrollWidthMap[gridSectionName] === width) {
            return;
        }
        this.gridSectionScrollWidthMap[gridSectionName] = width;
        this.subscriptionManager.emit(`bodySectionScrollWidthChanged`, { gridSectionName: gridSectionName, width: width });
    }

    get(gridSectionName: string) {
        return this.gridSectionScrollWidthMap[gridSectionName] || 0;
    }

    subscribe(onChange: (response: { gridSectionName: string, width: number }) => void) {
        return this.subscriptionManager.subscribe(`bodySectionScrollWidthChanged`, onChange);
    }
}