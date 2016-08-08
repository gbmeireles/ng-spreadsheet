import { Injectable } from '@angular/core';
import { GridSection } from '../Model/Model';
@Injectable()
export class GridSectionDataRowMapGetter {

    constructor() { }

    get(gridSection: GridSection): GridSection {
        gridSection = Object.assign({}, gridSection);
        gridSection.dataRowMap = {};
        var counter = 0;
        gridSection.dataRowList.forEach(gridRow => {
            gridSection.dataRowMap[gridRow.sectionRowIndex] = gridRow;
        });
        return gridSection;
    }
}