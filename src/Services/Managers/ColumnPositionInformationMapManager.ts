import { Injectable, EventEmitter } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';
import { TableIdManager } from './TableIdManager';
import { Column } from '../../Model/Column';
import { ColumnPositionInformationMap } from '../../Model/ColumnPositionInformationMap';

@Injectable()
export class ColumnPositionInformationMapManager {
    private columnPositionInformationMap: ColumnPositionInformationMap;
    constructor(private subscriptionManager: SubscriptionManager,
        private tableIdManager: TableIdManager) {
        this.columnPositionInformationMap = {};
    }

    get(): ColumnPositionInformationMap {
        return this.columnPositionInformationMap;
    }

    set(columnPositionInformationMap: ColumnPositionInformationMap) {
        if (this.columnPositionInformationMap === columnPositionInformationMap) {
            return;
        }
        this.columnPositionInformationMap = columnPositionInformationMap;
    }
}