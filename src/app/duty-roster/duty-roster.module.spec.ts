import { DutyRosterModule } from './duty-roster.module';

describe('DutyRosterModule', () => {
  let dutyRosterModule: DutyRosterModule;

  beforeEach(() => {
    dutyRosterModule = new DutyRosterModule();
  });

  it('should create an instance', () => {
    expect(dutyRosterModule).toBeTruthy();
  });
});
