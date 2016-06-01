import { GridRow } from '../Model/GridRow';

export interface GridSection {
    name: string;
    columnList: Column[];
    titleRowList: GridRow[];
    dataRowList: GridRow[];
    dataRowMap: { [sectionRowIndex: number]: GridRow };
    visibleDataRowList?: GridRow[];
    width?: number;
    defaultWidth?: number;
}