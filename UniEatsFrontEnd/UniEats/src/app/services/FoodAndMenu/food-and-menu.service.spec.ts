import { TestBed } from '@angular/core/testing';

import { FoodAndMenuService } from './food-and-menu.service';

describe('FoodAndMenuService', () => {
  let service: FoodAndMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodAndMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
