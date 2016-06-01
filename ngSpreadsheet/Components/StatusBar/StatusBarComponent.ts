import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

@Component({
    moduleId: __moduleName,
    selector: 'GgStatusBar',
    templateUrl: 'StatusBar.html',
    styleUrls: ['StatusBar.css'],
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
            if (changes['timeout'].currentValue !== undefined) {
                this.timeoutId = setTimeout(() => {
                    this.isVisible = false;
                    this.timeout = undefined;
                }, this.timeout);
            }
        }
    }
}