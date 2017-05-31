import { Component, Input, OnInit, OnChanges, SimpleChange, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'StatusBar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css'],
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