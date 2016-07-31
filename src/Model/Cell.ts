import { GridCell } from './GridCell';

export interface Cell {
    left: number;
    width: number;
    gridColumnIndex: number;
    sectionColumnIndex?: number;
    getScrollWidth: () => number;
    gridCell: GridCell;
    isActive: boolean;
    goToEditMode?: () => void;
    cancelEdit?: () => void;
    isEditing?: boolean;
}