import { TestBed, inject } from '@angular/core/testing';

import { HttpAuthInterceptorService } from './http-auth-interceptor.service';

describe('HttpAuthInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpAuthInterceptorService]
    });
  });

  it('should ...', inject([HttpAuthInterceptorService], (service: HttpAuthInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
