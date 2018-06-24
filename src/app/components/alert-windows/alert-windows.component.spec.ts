import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertWindowsComponent } from './alert-windows.component';

describe('AlertWindowsComponent', () => {
  let component: AlertWindowsComponent;
  let fixture: ComponentFixture<AlertWindowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertWindowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
