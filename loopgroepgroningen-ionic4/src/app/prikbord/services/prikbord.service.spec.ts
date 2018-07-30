import { TestBed, inject } from '@angular/core/testing';

import { PrikbordService } from './prikbord.service';

describe('PrikbordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrikbordService]
    });
  });

  it('should be created', inject([PrikbordService], (service: PrikbordService) => {
    expect(service).toBeTruthy();
  }));
});
