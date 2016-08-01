import { EventEmitter, OpaqueToken, provide, Provider } from '@angular/core';
import { Event } from './Model/Model';

export * from './Model/Model';
export const EVENT_EMITTER_TOKEN = new OpaqueToken('Event Emitter');
export const EVENT_PROVIDERS = [provide(EVENT_EMITTER_TOKEN, { useFactory: () => { return new EventEmitter<Event>(false); } })];