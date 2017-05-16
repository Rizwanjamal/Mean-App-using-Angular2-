import { TestBed, inject } from '@angular/core/testing';

import { BookService } from './book.service';

describe('BookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService]
    });
  });

  it('should ...', inject([BookService], (service: BookService) => {
    expect(service).toBeTruthy();
  }));
});
