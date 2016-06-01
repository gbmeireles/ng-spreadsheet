import { GridCell } from './GridCell';

export interface Cell {
    left: number;
    width: number;
    columnIndex: number;
    sectionColumnIndex?: number;
    getScrollWidth: () => number;
    gridCell: GridCell;
    isActive: boolean;
    goToEditMode?: () => void;
    cancelEdit?: () => void;
    isEditing?: boolean;
}