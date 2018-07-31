import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Bericht} from '../../shared/berichten/models/bericht';

@Injectable({
  providedIn: 'root'
})
export class PrikbordService {

  constructor() {
  }

  getBerichten(): Observable<Bericht[]> {
    return of([{
      auteur: 'Michel',
      tijdstip: '2018-09-11T23:23',
      berichttekst: ['Ik heb een leuk bericht', 'Zie je wel?']
    }, {
      auteur: 'Jantina Loperina',
      tijdstip: '2018-09-11T23:23',
      berichttekst: ['Ik heb toch fijn gelopen vorige week.', 'Dankjewel daarvoor hoor!']
    }, {
      auteur: 'Henk Loperts',
      tijdstip: '2018-09-11T23:23',
      berichttekst: ['Tsja, wat zal ik daarvan zeggen?']
    }]);
  }

  verstuurBericht(reactie: string): Observable<void> {
    return of();
  }
}
