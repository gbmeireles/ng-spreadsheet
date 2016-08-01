import { Injectable, Inject, EventEmitter } from '@angular/core';
import {
    ColumnListManager,
    ColumnPositionInformationMapCalculator,
    ColumnPositionInformationMapManager,
} from '../../Services/Services';
import {
    Column,
} from '../../Model/Model';

import {
    ColumnResizedEvent,
    EVENT_EMITTER_TOKEN,
} from '../../Events/Events';

@Injectable()
export class ColumnSizeUpdater {

    constructor(private columnListManager: ColumnListManager,
        @Inject(EVENT_EMITTER_TOKEN) private eventEmitter: EventEmitter<ColumnResizedEvent>) { }

    updateColumnSize(columnName: string, newColumnSize: number) {
        var columnList = this.columnListManager.get().slice(0).map(i => <Column>Object.assign({}, i));
        var column = columnList.find(c => c.name === columnName);
        if (!column) {
            return;
        }

        column.width = newColumnSize;
        this.columnListManager.set(columnList);

        this.eventEmitter.emit(new ColumnResizedEvent(columnName, newColumnSize));
    }
}