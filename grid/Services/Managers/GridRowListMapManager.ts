import { Injectable } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';
import { GridRowListMap } from '../../Model/Model';

@Injectable()
export class GridRowListMapManager {
    private _gridRowList: GridRowListMap;

    constructor(private subscriptionManager: SubscriptionManager) {
    }

    get() {
        return this._gridRowList;
    }

    set(gridRowList: GridRowListMap) {
        this._gridRowList = gridRowList;

        this.subscriptionManager.emit('gridRowList', gridRowList);
    }

    subscribe(onChange) {
        return this.subscriptionManager.subscribe('gridRowList', onChange);
    }
}