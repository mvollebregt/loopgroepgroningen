import {Sectie} from './sectie';

export function sectioneer<T>(getTitel: (item: T) => string): (items: T[]) => Sectie<T>[] {
  return (items: T[]) => {
    let secties: Sectie<T>[] = [];
    let huidigeSectie: Sectie<T>;
    for (let item of items) {
      const titel = getTitel(item);
      if (huidigeSectie && huidigeSectie.titel === titel) {
        huidigeSectie.inhoud.push(item);
      } else {
        huidigeSectie = {
          titel: titel,
          inhoud: [item]
        };
        secties.push(huidigeSectie);
      }
    }
    return secties;
  }
}
