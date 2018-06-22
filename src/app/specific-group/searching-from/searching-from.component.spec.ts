import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingFromComponent } from './searching-from.component';

describe('SearchingFromComponent', () => {
  let component: SearchingFromComponent;
  let fixture: ComponentFixture<SearchingFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchingFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchingFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
