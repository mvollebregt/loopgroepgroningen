import {agendaReducer} from './agenda.reducer';
import {LaadAgendaEvenementenSucces} from './agenda.action';
import {AgendaState, EvenementState} from './agenda.state';
import {Evenement, Evenementdetails} from '../../api';

describe('agendaReducer', () => {

  describe('LaadAgendaEvenementenSucces', () => {

    // gegeven
    const details = {} as Evenementdetails;
    const oorspronkelijkEvenement = maakEvenement('oorspronkelijk id', 'oorspronkelijke naam', details);
    const extraEvenement = maakEvenement('extra id', 'extra evenement');
    const geladenEvenement = maakEvenement('oorspronkelijk id', 'oorspronkelijk...');
    const inputState = maakAgendaState(oorspronkelijkEvenement, extraEvenement);

    // als
    const outputState = agendaReducer(inputState, new LaadAgendaEvenementenSucces([geladenEvenement]));
    const resultaatEvenement = outputState.evenementStates.get('oorspronkelijk id').evenement;

    it('moet de bestaande details bewaren', () => {
      expect(resultaatEvenement.details).toBe(details);
    });

    it('moet de bestaande naam bewaren als de nieuwe naam een ingekorte versie is', () => {
      expect(resultaatEvenement.naam).toBe('oorspronkelijke naam');
    });

    it('moet verouderde evenementen verwijderen', () => {
      expect(outputState.evenementStates.get('extra id')).toBeFalsy();
    });
  });
});

function maakEvenement(id: string, naam: string, details?: Evenementdetails): Evenement {
  return {id, naam, details} as Evenement;
}

function maakAgendaState(...evenementen: Evenement[]): AgendaState {
  return {
    evenementStates: new Map(evenementen.map(evenement => [evenement.id, {evenement}] as [string, EvenementState]))
  } as AgendaState;
}
