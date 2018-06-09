import { TestBed, inject } from '@angular/core/testing';

import { FsmManagerService } from './fsm-manager.service';

describe('FsmManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FsmManagerService]
    });
  });

  it('should be created', inject([FsmManagerService], (service: FsmManagerService) => {
    expect(service).toBeTruthy();
  }));
});
