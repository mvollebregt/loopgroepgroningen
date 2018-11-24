import {scrape, Scraper} from './scrape';
import {Session} from '../api';

export const scrapeLoggedInSession: Scraper<Session> =
  () => ({});

export function scrapeSession(loginFormSelector: string): Scraper<Session> {
  return scrape(loginFormSelector, elements => elements.length === 0 ? {} : null);
}
