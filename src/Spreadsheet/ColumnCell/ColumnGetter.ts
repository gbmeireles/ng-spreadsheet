import { Injectable } from '@angular/core';
import {
    Column,
} from '../../Model/Model';

@Injectable()
export class ColumnGetter {

    constructor() { }

    getBySpreadsheetColumnIndex(columnList: Column[], spreadsheetColumnIndex: number): Column {
        return columnList.find(c => c.startIndex <= spreadsheetColumnIndex && c.endIndex >= spreadsheetColumnIndex);
    }
}