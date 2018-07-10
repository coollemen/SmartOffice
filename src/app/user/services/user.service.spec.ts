import { TestBed, inject } from '@angular/core/testing';

import { MsaUserService } from './user.service';

describe('MsaUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsaUserService]
    });
  });

  it('should be created', inject([MsaUserService], (service: MsaUserService) => {
    expect(service).toBeTruthy();
  }));
});
