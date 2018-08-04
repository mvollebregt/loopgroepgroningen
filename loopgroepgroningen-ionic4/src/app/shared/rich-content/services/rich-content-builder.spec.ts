import {RichContentBuilder} from './rich-content-builder';
import {Link, PlainText} from '../models/rich-content';
import {Paragraaf} from '../models/paragraaf';
import {Alinea} from '../models/alinea';

describe('RichContentBuilder', () => {

  let richContentBuilder: RichContentBuilder;

  beforeEach(() => {
    richContentBuilder = new RichContentBuilder();
  });

  it('moet links beginnend met www herkennen en vooraf laten gaan door http://', () => {
    // gegeven
    const dom = new DOMParser().parseFromString('ga naar www.loopgroepgroningen.nl.', 'text/html');
    // als
    richContentBuilder.extractRichContent([dom.body]);
    const result = richContentBuilder.build();
    // dan
    expect(result).toEqual([
      new Paragraaf([
        new Alinea([
          new PlainText('ga naar '),
          new Link('http://www.loopgroepgroningen.nl', 'www.loopgroepgroningen.nl'),
          new PlainText('.')
        ])
      ])
    ]);
  });

  it('moet meerdere links in één tekst herkennen', () => {
    // gegeven
    const dom = new DOMParser().parseFromString('link http://x.y en https://x.z', 'text/html');
    // als
    richContentBuilder.extractRichContent([dom.body]);
    const result = richContentBuilder.build();
    // dan
    expect(result).toEqual([
      new Paragraaf([
        new Alinea([
          new PlainText('link '),
          new Link('http://x.y'),
          new PlainText(' en '),
          new Link('https://x.z')
        ])
      ])
    ]);
  });

});
