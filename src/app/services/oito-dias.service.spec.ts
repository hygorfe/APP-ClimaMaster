import { TestBed } from '@angular/core/testing';

import { OitoDiasService } from './oito-dias.service';

describe('OitoDiasService', () => {
  let service: OitoDiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OitoDiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
