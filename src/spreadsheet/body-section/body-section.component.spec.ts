/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BodySectionComponent } from './body-section.component';

describe('BodySectionComponent', () => {
  let component: BodySectionComponent;
  let fixture: ComponentFixture<BodySectionComponent>;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ BodySectionComponent ]
  })
  .compileComponents();
  }));

  beforeEach(() => {
  fixture = TestBed.createComponent(BodySectionComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  });

  it('should create', () => {
  expect(component).toBeTruthy();
  });
});