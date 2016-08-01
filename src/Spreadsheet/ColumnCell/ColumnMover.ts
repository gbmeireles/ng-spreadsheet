import { Injectable, Inject, EventEmitter } from '@angular/core';
import {
    ColumnListManager,
} from '../../Services/Services';
import {
    ColumnMovedEvent,
    EVENT_EMITTER_TOKEN,
} from '../../Events/Events';
import {
    Column,
} from '../../Model/Model';
import { ColumnGetter } from './ColumnGetter';

@Injectable()
export class ColumnMover {

    constructor(private columnListManager: ColumnListManager,
        private columnGetter: ColumnGetter,
        @Inject(EVENT_EMITTER_TOKEN) private eventEmitter: EventEmitter<ColumnMovedEvent>) { }

    moveColumn(oldColumnIndex: number, newColumnIndex: number) {
        if (oldColumnIndex === newColumnIndex) {
            return;
        }

        var columnList = this.columnListManager.get().slice(0).map(i => <Column>Object.assign({}, i));
        var columnToTarget = this.columnGetter.getByGridColumnIndex(newColumnIndex);
        var columnToMove = this.columnGetter.getByGridColumnIndex(oldColumnIndex);

        if (!columnToMove) {
            return;
        }
        if (columnToTarget.endIndex !== columnToTarget.startIndex) {
            return;
        }
        if (columnToMove === columnToTarget) {
            return;
        }

        if (newColumnIndex > oldColumnIndex) {
            columnList.filter(c => c.startIndex >= oldColumnIndex && c.startIndex <= newColumnIndex).forEach(c => {
                c.startIndex--;
                c.endIndex--;
            });

        } else {
            columnList.filter(c => c.startIndex >= newColumnIndex && c.startIndex <= oldColumnIndex).forEach(c => {
                c.startIndex++;
                c.endIndex++;
            });
        }
        columnToMove.startIndex = newColumnIndex;
        columnToMove.endIndex = newColumnIndex;

        columnList.splice(oldColumnIndex, 1);
        columnList.splice(newColumnIndex, 0, columnToMove);

        this.columnListManager.set(columnList);

        this.eventEmitter.emit(new ColumnMovedEvent(newColumnIndex, oldColumnIndex));
    }
}