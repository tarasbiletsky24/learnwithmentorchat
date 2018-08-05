import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSuggestedDeadlinesComponent } from './review-suggested-deadlines.component';

describe('ReviewSuggestedDeadlinesComponent', () => {
  let component: ReviewSuggestedDeadlinesComponent;
  let fixture: ComponentFixture<ReviewSuggestedDeadlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewSuggestedDeadlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSuggestedDeadlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
