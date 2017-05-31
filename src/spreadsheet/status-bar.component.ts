import { Component, Input, OnInit, OnChanges, SimpleChange, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

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
    selector: 'StatusBar',
    template: html,
    styles: [css],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent implements OnInit, OnChanges {
    @Input('message') message = '';
    @Input('timeout') timeout: number;
    @Input('count') count: number;
    isVisible: boolean = false;
    private timeoutId: number;
    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() { }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.message == null || this.message == '') {
            this.isVisible = false;
        } else {
            this.isVisible = true;
        }

        clearTimeout(this.timeoutId);
        if (this.isVisible) {
            if (this.timeout != null) {
                this.timeoutId = setTimeout(() => {
                    this.isVisible = false;
                    this.cdr.markForCheck();
                }, this.timeout);
            }
        }
    }
}