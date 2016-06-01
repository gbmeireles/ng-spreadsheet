import { Injectable, EventEmitter } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';
import { TableIdManager } from './TableIdManager';

@Injectable()
export class SectionPositionInformationMapManager {
    constructor(private subscriptionManager: SubscriptionManager,
        private tableIdManager: TableIdManager) {
    }

    get() {
        var storageKey = this.getKey();
        if (!storageKey) {
            console.warn('Cannot load previous section position information because storage key is not defined');
            return <SectionPositionInformationMap>{};
        }
        return <SectionPositionInformationMap>(JSON.parse(localStorage.getItem(storageKey)) || {});
    }

    set(sectionPositionInformationMap: SectionPositionInformationMap) {
        var storageKey = this.getKey();
        if (!storageKey) {
            console.warn('Cannot save section position information because storage key is not defined');
        } else {
            window.localStorage.setItem(storageKey, JSON.stringify(sectionPositionInformationMap));
        }

        this.notifyChange(sectionPositionInformationMap);
    }

    subscribe(onChange: (sectionPositionInformationMap: SectionPositionInformationMap) => void) {
        return this.subscriptionManager.subscribe(this.getKey(), onChange);
    }

    private notifyChange(sectionPositionInformationMap: SectionPositionInformationMap) {
        return this.subscriptionManager.emit(this.getKey(), sectionPositionInformationMap);
    }

    private getKey() {
        var tableId = this.tableIdManager.get();
        if (!tableId) {
            console.warn('Cannot generate section position information storage key because table id is not defined');
            return;
        }
        return `${tableId}_sectionPositionInformationMap`;
    }
}