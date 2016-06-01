import { Injectable } from '@angular/core';
import { GridData } from '../../Model/Model';
import { SubscriptionManager } from './SubscriptionManager';

@Injectable()
export class GridDataManager {
    private _gridData: GridData;

    constructor(private subscriptionManager: SubscriptionManager) {
    }

    get() {
        return this._gridData;
    }

    set(gridData: GridData) {
        this._gridData = gridData;

        this.subscriptionManager.emit('gridData', gridData);
    }

    subscribe(onChange) {
        return this.subscriptionManager.subscribe('gridData', onChange);
    }
}