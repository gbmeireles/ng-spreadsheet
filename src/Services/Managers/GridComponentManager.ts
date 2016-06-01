import { Injectable } from '@angular/core';
import { SubscriptionManager } from './SubscriptionManager';
import { GridComponent } from '../../Components/Grid/GridComponent';

@Injectable()
export class GridComponentManager {
    gridComponent: GridComponent;

    set(gridComponent: GridComponent) {
        this.gridComponent = gridComponent;
    }

    get(): GridComponent {
        return this.gridComponent;
    }
}