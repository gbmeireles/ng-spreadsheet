import { Injectable } from '@angular/core';

@Injectable()
export class SubscriptionManager {
    private static subscriptionManagerStorage: { [eventName: string]: { [subscriptionId: number]: (eventValue: any) => void } } = {};
    private static subscriptionId: number = 0;

    subscribe<T>(eventName: string, onEvent: (eventValue: T) => void): () => void {
        if (!SubscriptionManager.subscriptionManagerStorage[eventName]) {
            SubscriptionManager.subscriptionManagerStorage[eventName] = [];
        }
        if (typeof onEvent !== 'function') {
            return () => { };
        }
        var subscriptionMap = SubscriptionManager.subscriptionManagerStorage[eventName];
        SubscriptionManager.subscriptionId++;
        var subscriptionId = SubscriptionManager.subscriptionId;
        subscriptionMap[subscriptionId] = onEvent;

        return () => {
            delete subscriptionMap[subscriptionId];
        };
    }

    emit(eventName: string, value) {
        if (!SubscriptionManager.subscriptionManagerStorage[eventName]) {
            return;
        }

        var subscriptionMap = SubscriptionManager.subscriptionManagerStorage[eventName];
        Object.keys(subscriptionMap).forEach(key => {
            if (typeof subscriptionMap[key] === 'function') {
                subscriptionMap[key](value);
            }
        });
    }
}