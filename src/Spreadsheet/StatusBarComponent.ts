import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

const css = `
:host {
    display: block;
    position: relative;
}

div {
    height: 20px;
    background-color: #E6E6E6;
    position: relative;
    border: 1px solid #C6C6C6;
    transition: all 0.4s ease-out;
    transform: translate(0,-100%);
    display: none;
    opacity: 0;
}

div.is-visible {
    display: block;
    transition: all 0.4s ease-out;
    opacity: 1;
    transform: translate(0,0);
}`;

const html = `
<div [class.is-visible]="isVisible">
    <span>{{message}}</span>
</div>`;

@Component({
    selector: 'GgStatusBar',
    template: html,
    styles: [css],
})
export class StatusBarComponent implements OnInit, OnChanges {
    @Input('message') message = '';
    @Input('timeout') timeout: number;
    isVisible: boolean = false;
    private timeoutId: number;
    constructor() { }

    ngOnInit() { }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['message']) {
            if (changes['message'].currentValue == null || changes['message'].currentValue == '') {
                this.isVisible = false;
            } else {
                this.isVisible = true;
            }
        }
        if (changes['timeout']) {
            clearTimeout(this.timeoutId);
            if (changes['timeout'].currentValue != null) {
                this.timeoutId = setTimeout(() => {
                    this.isVisible = false;
                    this.timeout = undefined;
                }, this.timeout);
            }
        }
    }
}