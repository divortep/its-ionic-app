import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTasksPage } from './available-tasks.page';

describe('AvailableTasksPage', () => {
  let component: AvailableTasksPage;
  let fixture: ComponentFixture<AvailableTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableTasksPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
