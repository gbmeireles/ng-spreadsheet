import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    BodyComponent,
    BodySectionComponent,
    CellComponent,
    ColumnCellComponent,
    ColumnCornerCellComponent,
    ColumnResizeComponent,
    ColumnRowComponent,
    DetailsBarComponent,
    HeaderComponent,
    HeaderSectionComponent,
    NumberRowListComponent,
    RowComponent,
    RowListComponent,
    SpreadsheetComponent,
    StatusBarComponent,
} from './spreadsheet/spreadsheet';

const declarations = [
    BodyComponent,
    BodySectionComponent,
    CellComponent,
    ColumnCellComponent,
    ColumnCornerCellComponent,
    ColumnResizeComponent,
    ColumnRowComponent,
    DetailsBarComponent,
    HeaderComponent,
    HeaderSectionComponent,
    NumberRowListComponent,
    RowComponent,
    RowListComponent,
    SpreadsheetComponent,
    StatusBarComponent,
];

@NgModule({
    declarations: declarations,
    providers: [],
    imports: [CommonModule],
    exports: [SpreadsheetComponent],
})
export class SpreadsheetModule { }

export default SpreadsheetModule;
