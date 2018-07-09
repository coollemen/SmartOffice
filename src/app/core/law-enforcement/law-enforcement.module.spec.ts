import { LawEnforcementModule } from './law-enforcement.module';

describe('LawEnforcementModule', () => {
  let lawEnforcementModule: LawEnforcementModule;

  beforeEach(() => {
    lawEnforcementModule = new LawEnforcementModule();
  });

  it('should create an instance', () => {
    expect(lawEnforcementModule).toBeTruthy();
  });
});
