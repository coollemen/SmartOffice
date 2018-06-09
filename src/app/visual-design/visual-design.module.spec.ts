import { VisualDesignModule } from './visual-design.module';

describe('VisualDesignModule', () => {
  let visualDesignModule: VisualDesignModule;

  beforeEach(() => {
    visualDesignModule = new VisualDesignModule();
  });

  it('should create an instance', () => {
    expect(visualDesignModule).toBeTruthy();
  });
});
