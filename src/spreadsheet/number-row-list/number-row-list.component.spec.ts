/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NumberRowListComponent } from './number-row-list.component';

describe('NumberRowListComponent', () => {
  let component: NumberRowListComponent;
  let fixture: ComponentFixture<NumberRowListComponent>;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ NumberRowListComponent ]
  })
  .compileComponents();
  }));

  beforeEach(() => {
  fixture = TestBed.createComponent(NumberRowListComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  });

  it('should create', () => {
  expect(component).toBeTruthy();
  });
});