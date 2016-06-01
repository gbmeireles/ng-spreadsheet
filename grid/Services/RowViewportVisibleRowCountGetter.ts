import { Injectable } from '@angular/core';
import {
    BodyHeightManager,
    RowHeightManager,
} from '../Services/Managers/Managers';

@Injectable()
export class RowViewportVisibleRowCountGetter {
    constructor(private bodyHeightManager: BodyHeightManager,
        private rowHeightManager: RowHeightManager) {

    }

    get() {
        var bodyHeight = this.bodyHeightManager.get();
        var rowHeight = this.rowHeightManager.get();

        if (rowHeight === undefined) {
            throw 'Row height is not defined';
        }

        var visibleRowCount = Math.ceil(bodyHeight / rowHeight);

        return visibleRowCount;
    }
}