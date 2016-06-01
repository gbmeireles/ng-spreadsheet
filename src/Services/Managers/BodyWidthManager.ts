import { Injectable } from '@angular/core';

@Injectable()
export class BodyWidthManager {
    private bodyWidth: number;

    get() {
        return this.bodyWidth || 0;
    }

    set(width: number) {
        this.bodyWidth = width;
    }
}