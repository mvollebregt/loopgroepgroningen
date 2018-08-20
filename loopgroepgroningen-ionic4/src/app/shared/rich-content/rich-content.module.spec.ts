import {RichContentModule} from './rich-content.module';

describe('RichContentModule', () => {
  let richContentModule: RichContentModule;

  beforeEach(() => {
    richContentModule = new RichContentModule();
  });

  it('should create an instance', () => {
    expect(richContentModule).toBeTruthy();
  });
});
