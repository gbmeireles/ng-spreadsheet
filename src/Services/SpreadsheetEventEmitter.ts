import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class SpreadsheetEventEmitter extends Subject<any> {

    constructor() {
        super();
    }

    emit(data: any) {
        this.next(data);
    }
}