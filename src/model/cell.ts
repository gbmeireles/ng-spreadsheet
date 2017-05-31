import { SpreadsheetCell } from './spreadsheet-cell';

export interface Cell {
  left: number;
  width: number;
  spreadsheetColumnIndex: number;
  sectionColumnIndex?: number;
  getScrollWidth: () => number;
  spreadsheetCell: SpreadsheetCell;
  isActive: boolean;
  confirmEdit?: () => void;
  goToEditMode?: () => void;
  cancelEdit?: () => void;
  isEditing?: boolean;
  getElement: () => HTMLElement;
}