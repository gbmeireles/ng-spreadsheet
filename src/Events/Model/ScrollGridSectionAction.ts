import { Action } from './Action';
export class ScrollGridSectionAction implements Action {
    static type = 'SectionHorizontallyScrolled';
    type: string;
    payload: {
        sectionName: string;
        scrollLeft: number;
    };

    constructor(sectionName: string, scrollLeft: number) {
        this.type = ScrollGridSectionAction.type;
        this.payload = {
            sectionName: sectionName,
            scrollLeft: scrollLeft,
        };
    }
}