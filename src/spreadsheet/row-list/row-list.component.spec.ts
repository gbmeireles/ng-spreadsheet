/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RowListComponent } from './row-list.component';

describe('RowListComponent', () => {
  let component: RowListComponent;
  let fixture: ComponentFixture<RowListComponent>;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ RowListComponent ]
  })
  .compileComponents();
  }));

  beforeEach(() => {
  fixture = TestBed.createComponent(RowListComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  });

  it('should create', () => {
  expect(component).toBeTruthy();
  });
});