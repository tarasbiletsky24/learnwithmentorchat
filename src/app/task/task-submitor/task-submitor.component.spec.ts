import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSubmitorComponent } from './task-submitor.component';

describe('TaskSubmitorComponent', () => {
  let component: TaskSubmitorComponent;
  let fixture: ComponentFixture<TaskSubmitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSubmitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSubmitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
