import { SubscriptionManager } from './SubscriptionManager';
import { Injectable, EventEmitter } from '@angular/core';
import { ColumnDefinition } from '../../Model/Model';

@Injectable()
export class ColumnDefinitionListManager {
    private columnDefinitionList: ColumnDefinition[] = [];

    constructor(private subscriptionManager: SubscriptionManager) {

    }

    get() {
        return this.columnDefinitionList || [];
    }

    set(columnDefinitionList: ColumnDefinition[]) {
        this.columnDefinitionList = columnDefinitionList;

        this.subscriptionManager.emit('columnList', columnDefinitionList);
    }

    subscribe(onChange: (columnDefinitionList: ColumnDefinition[]) => void) {
        return this.subscriptionManager.subscribe('columnList', onChange);
    }
}