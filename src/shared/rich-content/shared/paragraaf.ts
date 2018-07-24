import {Alinea} from './alinea';
import {RichContent} from './rich-content';

export class Paragraaf {

  private _alineas: Alinea[] = [];
  currentAlinea: Alinea;

  constructor(content: RichContent[] = null) {
    if (content) {
      this.currentAlinea = new Alinea(content);
    }
  }

  get alineas(): Alinea[] {
    return this.hasCurrentAlinea() ? [...this._alineas, this.currentAlinea] : this._alineas;
  }

  addAlineas(...extraAlineas: Alinea[]) {
    this.finishAlinea();
    this._alineas.push(...extraAlineas);
  }

  addContent(...content: RichContent[]) {
    this.assureCurrentAlinea();
    this.currentAlinea.addContent(...content)
  }

  hasCurrentAlinea(): boolean {
    return this.currentAlinea !== undefined && this.currentAlinea.content.length > 0;
  }

  finishAlinea() {
    this._alineas = [...this.alineas];
    this.currentAlinea = undefined;
  }

  private assureCurrentAlinea(): void {
    if (!this.currentAlinea) {
      this.currentAlinea = new Alinea();
    }
  }
}
