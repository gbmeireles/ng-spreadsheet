import { Injectable } from '@angular/core';
import { SectionPositionInformationMapCalculator } from '../Services/SectionPositionInformationMapCalculator';
import {
    GridSectionListManager,
    SectionPositionInformationMapManager,
} from '../Services/Managers/Managers';

@Injectable()
export class SectionPositionInformationMapUpdater {
    constructor(private sectionPositionInformationMapCalculator: SectionPositionInformationMapCalculator,
        private gridSectionListManager: GridSectionListManager,
        private sectionPositionInformationMapManager: SectionPositionInformationMapManager) {
    }

    init() {
        this.gridSectionListManager.subscribe((gridSectionList) => {
            this.update(gridSectionList);
        });
    }

    update(gridSectionList) {
        var sectionPositionInformationMap = this.sectionPositionInformationMapCalculator.calculate(gridSectionList);
        this.sectionPositionInformationMapManager.set(sectionPositionInformationMap);
    }
}