import {Alinea, Paragraaf, RichContent} from '../../api';


export class DocumentBuilder {

  private paragrafen: Paragraaf[] = [];
  private currentParagraaf: Paragraaf;
  private currentAlinea: Alinea;

  build() {
    this.finishAlinea();
    this.finishParagraaf();
    return this.paragrafen;
  }

  addContent(...content: RichContent[]) {
    this.assureCurrentParagraaf();
    this.assureCurrentAlinea();
    this.currentAlinea.content.push(...content);
  }

  finishAlinea() {
    if (this.hasCurrentAlinea()) {
      this.currentParagraaf.alineas.push(this.currentAlinea);
    }
    this.currentAlinea = undefined;
  }

  finishParagraaf() {
    this.finishAlinea();
    if (this.hasCurrentParagraaf()) {
      this.paragrafen.push(this.currentParagraaf);
    }
    this.currentParagraaf = undefined;
  }

  addBreak() {
    if (this.hasCurrentAlinea()) {
      this.finishAlinea();
    } else {
      this.finishParagraaf();
    }
  }

  endsWithEmptyAlinea(): boolean {
    return this.currentParagraaf && this.currentAlinea && this.currentAlinea.content.length === 0;
  }

  private assureCurrentParagraaf(): void {
    if (!this.currentParagraaf) {
      this.currentParagraaf = new Paragraaf();
    }
  }

  private assureCurrentAlinea(): void {
    if (!this.currentAlinea) {
      this.currentAlinea = new Alinea();
    }
  }

  private hasCurrentParagraaf(): boolean {
    return this.currentParagraaf !== undefined && this.currentParagraaf.alineas.length > 0;
  }

  private hasCurrentAlinea(): boolean {
    return this.currentAlinea !== undefined && this.currentAlinea.content.length > 0;
  }
}
