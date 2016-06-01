import { Injectable } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';
import { GridCell } from '../../Model/Model';

@Injectable()
export class ActiveCellManager {
    private _activeCell: GridCell;

    constructor(private subscriptionManager: SubscriptionManager) {
    }

    get(): GridCell {
        return this._activeCell;
    }

    set(activeCell: GridCell) {
        if (this._activeCell === activeCell) {
            return;
        }
        this._activeCell = activeCell;

        this.subscriptionManager.emit('activeCell', activeCell);
    }

    subscribe(onChange: (activeCell: GridCell) => void) {
        return this.subscriptionManager.subscribe('activeCell', onChange);
    }
}