import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedTasksPage } from './accepted-tasks.page';

describe('AcceptedTasksPage', () => {
  let component: AcceptedTasksPage;
  let fixture: ComponentFixture<AcceptedTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedTasksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
