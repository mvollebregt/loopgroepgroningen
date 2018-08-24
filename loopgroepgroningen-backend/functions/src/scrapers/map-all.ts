import {Element} from 'jsdom';

export function mapAll<T>(elements: Element[], mapper: (element: Element) => T): T[] {
  const result = [];
  for (let i = 0; i < elements.length; i++) {
    result.push(mapper(elements[i]));
  }
  return result;
}
