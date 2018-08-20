import { PrikbordModule } from './prikbord.module';

describe('PrikbordModule', () => {
  let prikbordModule: PrikbordModule;

  beforeEach(() => {
    prikbordModule = new PrikbordModule();
  });

  it('should create an instance', () => {
    expect(prikbordModule).toBeTruthy();
  });
});
