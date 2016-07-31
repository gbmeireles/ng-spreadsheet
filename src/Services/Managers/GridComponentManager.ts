import { Injectable } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';
import { SpreadsheetComponent } from '../../Spreadsheet/SpreadsheetComponent';

@Injectable()
export class GridComponentManager {
    gridComponent: SpreadsheetComponent;

    set(gridComponent: SpreadsheetComponent) {
        this.gridComponent = gridComponent;
    }

    get(): SpreadsheetComponent {
        return this.gridComponent;
    }
}