import {Element, JSDOM} from 'jsdom';

export type Scraper<T> = (body: string) => T;

export function scrape<T>(selector: string, mapper: (elements: Element[]) => T): Scraper<T> {
  return body => {
    const doc = new JSDOM(body).window.document;
    const elements = doc.querySelectorAll(selector);
    return mapper(elements);
  }
}

export function scrapeList<T>(selector: string, mapper: (element: Element) => T): Scraper<T[]> {
  return scrape(selector, mapAll(mapper));
}

function mapAll<T>(mapper: (element: Element) => T): (elements: Element[]) => T[] {
  return elements => {
    const result = [];
    for (const element of elements) {
      result.push(mapper(element));
    }
    return result;
  };
}
