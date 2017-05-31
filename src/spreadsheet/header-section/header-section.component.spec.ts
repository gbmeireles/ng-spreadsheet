/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderSectionComponent } from './header-section.component';

describe('HeaderSectionComponent', () => {
  let component: HeaderSectionComponent;
  let fixture: ComponentFixture<HeaderSectionComponent>;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ HeaderSectionComponent ]
  })
  .compileComponents();
  }));

  beforeEach(() => {
  fixture = TestBed.createComponent(HeaderSectionComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  });

  it('should create', () => {
  expect(component).toBeTruthy();
  });
});