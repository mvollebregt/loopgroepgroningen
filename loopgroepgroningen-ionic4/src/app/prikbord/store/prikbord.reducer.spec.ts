import {LaadOuderePrikbordBerichtenSucces} from './prikbord.action';
import {prikbordReducer} from './prikbord.reducer';
import {Bericht} from '../../api';

describe('prikbordReducer', () => {

  describe('LaadPrikbordBerichtenSucces', () => {

    // gegeven
    const [nieuwerBericht, ouderBericht] = [{tijdstip: '2018-07-13'}, {tijdstip: '1976-07-13'}] as Bericht[];
    const berichten = [nieuwerBericht, ouderBericht];
    const outputState = prikbordReducer(undefined, new LaadOuderePrikbordBerichtenSucces(berichten));


    it('moet berichten inladen', () => {
      expect(outputState.berichten).toEqual([ouderBericht, nieuwerBericht]);
    });

  });
});
