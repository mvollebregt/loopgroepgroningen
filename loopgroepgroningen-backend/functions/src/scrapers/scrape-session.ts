import {scrape, Scraper} from './scrape';
import {Session} from '../api';

export const scrapeLoggedInSession: Scraper<Session> =
  () => ({loggedIn: true});

export function scrapeSession(loginFormSelector: string): Scraper<Session> {
  return scrape(loginFormSelector, elements => ({loggedIn: elements.length === 0}));
}
