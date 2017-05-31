/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ColumnRowComponent } from './column-row.component';

describe('ColumnRowComponent', () => {
  let component: ColumnRowComponent;
  let fixture: ComponentFixture<ColumnRowComponent>;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ ColumnRowComponent ]
  })
  .compileComponents();
  }));

  beforeEach(() => {
  fixture = TestBed.createComponent(ColumnRowComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  });

  it('should create', () => {
  expect(component).toBeTruthy();
  });
});