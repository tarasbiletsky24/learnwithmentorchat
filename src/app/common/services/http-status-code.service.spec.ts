import { TestBed, inject } from '@angular/core/testing';

import { HttpStatusCodeService } from './http-status-code.service';

describe('HttpStatusCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpStatusCodeService]
    });
  });

  it('should be created', inject([HttpStatusCodeService], (service: HttpStatusCodeService) => {
    expect(service).toBeTruthy();
  }));
});
