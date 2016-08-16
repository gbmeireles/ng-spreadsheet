import { Component, OnInit, Inject, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import {
    Action,
    DISPATCHER_TOKEN,
    ClearFilterAction,
} from '../Events/Events';
const css = `
:host() {
    position: absolute;
    width: 20px;
    background-color: #E6E6E6;
    height: 20px;
    border-bottom: 1px inset #A3A3A3;
    border-right: 1px inset #A3A3A3;
    z-index: 1;
}
`;

const html = `<span class="clear-filter-icon"></span>`;

@Component({
    selector: 'ColumnCornerCell',
    template: html,
    styles: [
        css,
    ],
})
export class ColumnCornerCellComponent implements OnInit {
    @HostBinding('class.is-filtered')
    @Input('isFiltered')
    isFiltered: boolean;

    constructor( @Inject(DISPATCHER_TOKEN) private eventEmitter: EventEmitter<Action>) { }

    ngOnInit() { }

    @HostListener('click')
    clearFilter() {
        if (this.isFiltered) {
            this.eventEmitter.emit(new ClearFilterAction());
        }
    }
}