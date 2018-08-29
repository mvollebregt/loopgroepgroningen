import {Element, JSDOM} from 'jsdom';

export type Scraper<T> = (body: string) => T;

export function scrape<T>(selector: string, mapper: (elements: Element[]) => T): Scraper<T> {
  return body => {
    const doc = new JSDOM(body).window.document;
    const elements = doc.querySelectorAll(selector);
    return mapper(elements);
  }
}

export function scrapeList<T>(selector: string, mapper: (element: Element, volgnummer: number) => T): Scraper<T[]> {
  return scrape(selector, mapAll(mapper));
}

function mapAll<T>(mapper: (element: Element, volgnummer: number) => T): (elements: Element[]) => T[] {
  return elements => {
    const result = [];
    for (let i = 0; i < elements.length; i++) {
      result.push(mapper(elements[i], i));
    }
    return result;
  };
}
