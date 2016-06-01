import { Injectable } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';
import { GridSection } from '../../Model/Model';

@Injectable()
export class GridSectionListManager {
    gridSectionList: GridSection[];

    constructor(private subscriptionManager: SubscriptionManager) {
        this.gridSectionList = [];
    }

    set(gridSectionList: GridSection[]) {
        if (this.gridSectionList === gridSectionList) {
            return;
        }

        this.gridSectionList = gridSectionList;
        this.subscriptionManager.emit(`tableSectionListChanged`, gridSectionList);
    }

    get(): GridSection[] {
        return this.gridSectionList.slice(0);
    }

    subscribe(onChange: (gridSectionList: GridSection[]) => void) {
        return this.subscriptionManager.subscribe(`tableSectionListChanged`, onChange);
    }
}