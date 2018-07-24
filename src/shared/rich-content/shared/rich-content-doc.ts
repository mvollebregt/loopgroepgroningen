import {Paragraaf} from './paragraaf';
import {RichContent} from './rich-content';

export class RichContentDoc {

  private _paragrafen: Paragraaf[] = [];
  private currentParagraaf: Paragraaf;

  constructor(content: RichContent[] = null) {
    if (content) {
      this.currentParagraaf = new Paragraaf(content);
    }
  }

  get paragrafen(): Paragraaf[] {
    return this.hasCurrentParagraaf() ? [...this._paragrafen, this.currentParagraaf] : this._paragrafen;
  }

  addContent(...content: RichContent[]) {
    this.assureCurrentParagraaf();
    this.currentParagraaf.addContent(...content);
  }

  hasCurrentParagraaf(): boolean {
    return this.currentParagraaf !== undefined && this.currentParagraaf.alineas.length > 0
  }

  addBreak() {
    if (this.hasCurrentParagraaf()) {
      if (this.currentParagraaf.hasCurrentAlinea()) {
        this.finishAlinea();
      } else {
        this.finishParagraaf();
      }
    }
  }

  finishParagraaf() {
    this._paragrafen = [...this.paragrafen];
    this.currentParagraaf = undefined;
  }

  finishAlinea() {
    if (this.currentParagraaf) {
      this.currentParagraaf.finishAlinea();
    }
  }

  endsWithEmptyAlinea(): boolean {
    return this.currentParagraaf && this.currentParagraaf.currentAlinea && this.currentParagraaf.currentAlinea.content.length === 0;
  }


  private assureCurrentParagraaf(): void {
    if (!this.currentParagraaf) {
      this.currentParagraaf = new Paragraaf();
    }
  }
}
