import { TestBed } from '@angular/core/testing';

import { ProduuctsService } from './produucts.service';

describe('ProduuctsService', () => {
  let service: ProduuctsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduuctsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
