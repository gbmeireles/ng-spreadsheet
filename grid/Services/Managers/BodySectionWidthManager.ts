import { Injectable } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';

@Injectable()
export class BodySectionWidthManager {
    gridSectionWidthMap: { [gridSectionName: string]: number };

    constructor(private subscriptionManager: SubscriptionManager) {
        this.gridSectionWidthMap = {};
    }

    set(gridSectionName: string, width: number) {
        if (this.gridSectionWidthMap[gridSectionName] === width) {
            return;
        }
        this.gridSectionWidthMap[gridSectionName] = width;
        this.subscriptionManager.emit(`bodySectionWidthChanged`, { gridSectionName: gridSectionName, width: width });
    }

    get(gridSectionName: string) {
        return this.gridSectionWidthMap[gridSectionName] || 0;
    }

    subscribe(onChange: (response: { gridSectionName: string, width: number }) => void) {
        return this.subscriptionManager.subscribe(`bodySectionWidthChanged`, onChange);
    }
}