import { Injectable } from '@angular/core';
import {
    ColumnListManager,
    GridSectionListGetter,
    GridSectionListManager,
    GridDataManager,
} from '../../Services/Services';
import {
    Column,
    GridData,
} from '../../Model/Model';
import { ColumnGetter } from './ColumnGetter';

@Injectable()
export class ColumnMover {

    constructor(private columnListManager: ColumnListManager,
        private columnGetter: ColumnGetter,
        private gridSectionListGetter: GridSectionListGetter,
        private gridSectionListManager: GridSectionListManager,
        private gridDataManager: GridDataManager) { }

    moveColumn(oldColumnIndex: number, newColumnIndex: number) {
        var columnList = this.columnListManager.get().slice(0).map(i => <Column>Object.assign({}, i));
        var columnToTarget = this.columnGetter.getByGridColumnIndex(newColumnIndex);
        var columnToMove = this.columnGetter.getByGridColumnIndex(oldColumnIndex);

        if (!columnToMove) {
            return;
        }
        if (columnToTarget.endIndex !== columnToTarget.startIndex) {
            return;
        }
        if (columnToMove === columnToTarget) {
            return;
        }

        var gridData = <GridData>Object.assign({}, this.gridDataManager.get());
        var columnDefinitionList = gridData.columnDefinitionList;
        var columnDefinitionToMove = gridData.columnDefinitionList.find(cd => cd.name === columnToMove.name);
        var columnDefinitionToTarget = gridData.columnDefinitionList.find(cd => cd.name === columnToTarget.name);

        columnDefinitionList.splice(oldColumnIndex, 1);
        if (newColumnIndex > oldColumnIndex) {
            columnDefinitionList.splice(newColumnIndex + 1, 0, columnDefinitionToMove);

        } else {
            columnDefinitionList.splice(newColumnIndex, 0, columnDefinitionToMove);
        }

        this.gridDataManager.set(gridData);
    }
}