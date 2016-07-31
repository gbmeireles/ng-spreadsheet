import { Injectable } from '@angular/core';
import {
    ColumnListManager,
} from '../../Services/Services';
import {
    Column,
} from '../../Model/Model';

@Injectable()
export class ColumnGetter {

    constructor(private columnListManager: ColumnListManager) { }

    getByGridColumnIndex(gridColumnIndex: number): Column {
        var columnList = this.columnListManager.get();
        return columnList.find(c => c.startIndex <= gridColumnIndex && c.endIndex >= gridColumnIndex);
    }
}