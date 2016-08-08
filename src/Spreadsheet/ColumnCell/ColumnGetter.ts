import { Injectable } from '@angular/core';
import {
    Column,
} from '../../Model/Model';

@Injectable()
export class ColumnGetter {

    constructor() { }

    getByGridColumnIndex(columnList: Column[], gridColumnIndex: number): Column {
        return columnList.find(c => c.startIndex <= gridColumnIndex && c.endIndex >= gridColumnIndex);
    }
}