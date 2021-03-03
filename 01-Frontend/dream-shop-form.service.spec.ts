import { TestBed } from '@angular/core/testing';

import { DreamShopFormService } from './dream-shop-form.service';

describe('DreamShopFormService', () => {
  let service: DreamShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DreamShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
