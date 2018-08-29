import {Element} from 'jsdom';
import {Scraper} from './scrape';
import {Session} from '../api';

export function scrapeSession(): Scraper<Session> {
  // TODO: naam, gebruikersnaam...
  return () => ({});
}
