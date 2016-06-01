import { Injectable } from '@angular/core';

@Injectable()
export class BodyHeightManager {
    private bodyHeight: number;

    get() {
        return this.bodyHeight || 0;
    }

    set(height: number) {
        this.bodyHeight = height;
    }
}