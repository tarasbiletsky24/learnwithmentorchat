import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPlanForMentorComponent } from './specific-plan-for-mentor.component';

describe('SpecificPlanForMentorComponent', () => {
  let component: SpecificPlanForMentorComponent;
  let fixture: ComponentFixture<SpecificPlanForMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificPlanForMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificPlanForMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
