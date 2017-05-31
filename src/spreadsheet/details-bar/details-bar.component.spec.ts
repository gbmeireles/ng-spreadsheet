/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailsBarComponent } from './details-bar.component';

describe('DetailsBarComponent', () => {
  let component: DetailsBarComponent;
  let fixture: ComponentFixture<DetailsBarComponent>;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ DetailsBarComponent ]
  })
  .compileComponents();
  }));

  beforeEach(() => {
  fixture = TestBed.createComponent(DetailsBarComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  });

  it('should create', () => {
  expect(component).toBeTruthy();
  });
});