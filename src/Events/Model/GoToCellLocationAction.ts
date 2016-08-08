import { Action } from './Action';
export class GoToCellLocationAction implements Action {
    static type = 'GoToCellLocation';
    type: string;
    payload: {
        rowIndex: number;
        gridColumnIndex: number;
        isToUseMinimunScroll: boolean;
    };

    constructor(rowIndex: number, gridColumnIndex: number, isToUseMinimunScroll: boolean) {
        this.type = GoToCellLocationAction.type;
        this.payload = {
            rowIndex: rowIndex,
            gridColumnIndex: gridColumnIndex,
            isToUseMinimunScroll: isToUseMinimunScroll,
        };
    }
}