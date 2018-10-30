import {Injectable} from '@angular/core';
import {Sectie} from '../../api';

@Injectable({
  providedIn: 'root'
})
export class OpknipperService {

  /**
   * Knipt de items op in secties. Per item wordt de sectietitel bepaald door de functie getSectietitel.
   * Opeenvolgende items met dezelfde sectietitel komen indezelfde sectie. Items zonder sectietitel worden toegevoegd
   * aan de voorafgaande sectie.
   */
  maakSecties<T>(items: T[], getSectieTitel: (item: T) => string): Sectie<T>[] {
    const secties = [];
    let remainingItems = items;
    while (remainingItems && remainingItems.length > 0) {
      const sectietitel = this.findFirstSectietitel(remainingItems, getSectieTitel);
      const nextIndex = this.indexForSectietitelAndersDan(sectietitel, remainingItems, getSectieTitel);
      secties.push({titel: sectietitel, inhoud: remainingItems.slice(0, nextIndex)});
      remainingItems = remainingItems.slice(nextIndex);
    }
    return secties;
  }

  /**
   * Vindt de eerste sectietitel binnen remainingItems die ongelijk is aan leeg.
   */
  private findFirstSectietitel<T>(remainingItems: T[], getSectieTitel: (item: T) => string): string {
    let sectieTitel: string;
    let index = 0;
    while (!sectieTitel && index < remainingItems.length) {
      sectieTitel = getSectieTitel(remainingItems[index]);
      index++;
    }
    return sectieTitel;
  }

  /**
   * Vindt de eerste index binnen remainingItems waarvoor de sectietitel anders is dan de meegegeven sectietitel.
   */
  private indexForSectietitelAndersDan<T>(sectietitel: string, remainingItems: T[], getSectieTitel: (item: T) => string) {
    const nextIndex = remainingItems.findIndex(item => {
      const sectietitelVoorItem = getSectieTitel(item);
      return sectietitelVoorItem && sectietitelVoorItem !== sectietitel;
    });
    return nextIndex > -1 ? nextIndex : remainingItems.length;
  }
}
