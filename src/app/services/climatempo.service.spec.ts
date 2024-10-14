import { TestBed } from '@angular/core/testing';

import { ClimatempoService } from './climatempo.service';

describe('ClimatempoService', () => {
  let service: ClimatempoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClimatempoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
