import {TrainingsschemaModule} from './trainingsschema.module';

describe('TrainingsschemaModule', () => {
  let trainingsschemaModule: TrainingsschemaModule;

  beforeEach(() => {
    trainingsschemaModule = new TrainingsschemaModule();
  });

  it('should create an instance', () => {
    expect(trainingsschemaModule).toBeTruthy();
  });
});
