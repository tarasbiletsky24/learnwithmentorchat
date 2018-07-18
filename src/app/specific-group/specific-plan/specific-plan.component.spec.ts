import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPlanComponent } from './specific-plan.component';

describe('SpecificPlanComponent', () => {
  let component: SpecificPlanComponent;
  let fixture: ComponentFixture<SpecificPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
