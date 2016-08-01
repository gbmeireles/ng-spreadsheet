import { Event } from './Event';
export class SectionHorizontallyScrolledEvent implements Event {
    static type = 'SectionHorizontallyScrolled';
    type: string;
    payload: {
        sectionName: string;
        scrollLeft: number;
    };

    constructor(sectionName: string, scrollLeft: number) {
        this.type = SectionHorizontallyScrolledEvent.type;
        this.payload = {
            sectionName: sectionName,
            scrollLeft: scrollLeft,
        };
    }
}