import { Injectable } from '@angular/core';
import { ColumnPositionInformationMapCalculator } from '../Services/ColumnPositionInformationMapCalculator';
import {
    ColumnListManager,
    ColumnPositionInformationMapManager,
} from '../Services/Managers/Managers';
import { Column } from '../Model/Column';

@Injectable()
export class ColumnPositionInformationMapUpdater {
    constructor(private columnPositionInformationMapCalculator: ColumnPositionInformationMapCalculator,
        private columnListManager: ColumnListManager,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager) {
    }

    init() {
        this.columnListManager.subscribe((columnList) => {
            this.update(columnList);
        });
    }

    update(columnList: Column[]) {
        var columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(columnList);
        this.columnPositionInformationMapManager.set(columnPositionInformationMap);
    }
}