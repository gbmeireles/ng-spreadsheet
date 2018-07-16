import { Component, Input, OnInit, OnChanges, SimpleChange, ChangeDetectionStrategy, ChangeDetectorRef, Inject, EventEmitter } from '@angular/core';
import { DISPATCHER_TOKEN, Action, SetIsToShowStatusBarAction } from '../../events/events';

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
  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(DISPATCHER_TOKEN) private dispatcher: EventEmitter<Action>,
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (this.message == null || this.message == '') {
      this.isVisible = false;
      this.dispatcher.emit(new SetIsToShowStatusBarAction(false));
    } else {
      this.isVisible = true;
      this.dispatcher.emit(new SetIsToShowStatusBarAction(true));
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