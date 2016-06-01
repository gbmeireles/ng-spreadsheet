import { Injectable } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';
import { Column } from '../../Model/Column';

@Injectable()
export class ColumnListManager {
    columnList: Column[];

    constructor(private subscriptionManager: SubscriptionManager) {
        this.columnList = [];
    }

    set(columnList: Column[]) {
        if (this.columnList === columnList) {
            return;
        }

        this.columnList = columnList;
        this.subscriptionManager.emit(`gridColumnListChanged`, columnList);
    }

    get(): Column[] {
        return this.columnList;
    }

    subscribe(onChange: (columnList) => void) {
        return this.subscriptionManager.subscribe(`gridColumnListChanged`, onChange);
    }
}