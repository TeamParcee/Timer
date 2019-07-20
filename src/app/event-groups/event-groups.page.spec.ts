import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGroupsPage } from './event-groups.page';

describe('EventGroupsPage', () => {
  let component: EventGroupsPage;
  let fixture: ComponentFixture<EventGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGroupsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
