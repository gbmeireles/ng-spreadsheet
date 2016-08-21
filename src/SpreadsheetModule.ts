import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    BodyComponent,
    BodySectionComponent,
    CellComponent,
    ColumnCellComponent,
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
} from './Spreadsheet/Spreadsheet';

const declarations = [
    BodyComponent,
    BodySectionComponent,
    CellComponent,
    ColumnCellComponent,
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
export default class SpreadsheetModule { }
