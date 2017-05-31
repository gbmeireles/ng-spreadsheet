import { EventEmitter, OpaqueToken, FactoryProvider } from '@angular/core';
import { Action } from './model/model';

export * from './model/model';
export const DISPATCHER_TOKEN = new OpaqueToken('Dispatcher');
export const DISPATCHER_PROVIDERS = [
    <FactoryProvider>{
        provide: DISPATCHER_TOKEN,
        multi: false,
        useFactory: () => { return new EventEmitter<Action>(false); },
        deps: [],
    },
];