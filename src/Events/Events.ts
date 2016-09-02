import { EventEmitter, OpaqueToken, FactoryProvider } from '@angular/core';
import { Action } from './Model/Model';

export * from './Model/Model';
export const DISPATCHER_TOKEN = new OpaqueToken('Dispatcher');
export const DISPATCHER_PROVIDERS = [
    <FactoryProvider>{
        provide: DISPATCHER_TOKEN,
        multi: false,
        useFactory: () => { return new EventEmitter<Action>(false); },
        deps: [],
    },
];