import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansDisplayComponent } from './plans-display.component';

describe('PlansDisplayComponent', () => {
  let component: PlansDisplayComponent;
  let fixture: ComponentFixture<PlansDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
