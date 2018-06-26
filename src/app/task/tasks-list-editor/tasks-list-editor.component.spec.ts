import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListEditorComponent } from './tasks-list-editor.component';

describe('TasksListEditorComponent', () => {
  let component: TasksListEditorComponent;
  let fixture: ComponentFixture<TasksListEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksListEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
