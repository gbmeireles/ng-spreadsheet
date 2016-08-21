import { Action } from './Action';
export class ScrollSpreadsheetSectionAction implements Action {
    static type = 'SectionHorizontallyScrolled';
    type: string;
    payload: {
        sectionName: string;
        scrollLeft: number;
    };

    constructor(sectionName: string, scrollLeft: number) {
        this.type = ScrollSpreadsheetSectionAction.type;
        this.payload = {
            sectionName: sectionName,
            scrollLeft: scrollLeft,
        };
    }
}