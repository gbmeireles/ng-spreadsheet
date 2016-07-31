import { Injectable } from '@angular/core';
import {
    ColumnListManager,
    ColumnPositionInformationMapCalculator,
    ColumnPositionInformationMapManager,
} from '../../Services/Services';
import {
    Column,
} from '../../Model/Model';

@Injectable()
export class ColumnSizeUpdater {

    constructor(private columnListManager: ColumnListManager,
        private columnPositionInformationMapCalculator: ColumnPositionInformationMapCalculator,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager) { }

    updateColumnSize(columnName: string, newColumnSize: number) {
        var columnList = this.columnListManager.get().slice(0).map(i => <Column>Object.assign({}, i));
        var column = columnList.find(c => c.name === columnName);
        if (!column) {
            return;
        }

        column.width = newColumnSize;
        var columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(columnList);
        this.columnPositionInformationMapManager.set(columnPositionInformationMap);
        this.columnListManager.set(columnList);
    }
}