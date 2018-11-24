import {TestBed} from '@angular/core/testing';

import {VegetableJarService} from './vegetable-jar.service';

describe('VegetableJarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VegetableJarService = TestBed.get(VegetableJarService);
    expect(service).toBeTruthy();
  });
});
