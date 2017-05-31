/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ColumnCornerCellComponent } from './column-corner-cell.component';

describe('ColumnCornerCellComponent', () => {
  let component: ColumnCornerCellComponent;
  let fixture: ComponentFixture<ColumnCornerCellComponent>;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ ColumnCornerCellComponent ]
  })
  .compileComponents();
  }));

  beforeEach(() => {
  fixture = TestBed.createComponent(ColumnCornerCellComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  });

  it('should create', () => {
  expect(component).toBeTruthy();
  });
});