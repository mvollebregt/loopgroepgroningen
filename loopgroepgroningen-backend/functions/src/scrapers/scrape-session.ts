import {Element} from 'jsdom';
import {Scraper} from './scrape';
import {Session} from '../api';

export const scrapeSession: Scraper<Session> =
  // TODO: naam, gebruikersnaam...
  () => ({});
