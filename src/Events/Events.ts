import { EventEmitter, OpaqueToken, provide, Provider } from '@angular/core';
import { Action } from './Model/Model';

export * from './Model/Model';
export const DISPATCHER_TOKEN = new OpaqueToken('Dispatcher');
export const DISPATCHER_PROVIDERS = [
    provide(DISPATCHER_TOKEN, { useFactory: () => { return new EventEmitter<Action>(false); } }),
];