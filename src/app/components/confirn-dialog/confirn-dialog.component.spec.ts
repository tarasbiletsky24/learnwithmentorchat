import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirnDialogComponent } from './confirn-dialog.component';

describe('ConfirnDialogComponent', () => {
  let component: ConfirnDialogComponent;
  let fixture: ComponentFixture<ConfirnDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirnDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
