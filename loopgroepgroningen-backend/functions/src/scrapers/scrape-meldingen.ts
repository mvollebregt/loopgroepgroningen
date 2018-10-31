import {scrapeList, Scraper} from './scrape';

export const scrapeMeldingen: Scraper<string[]> =
  scrapeList('#system-message-container .warning li', element => element.textContent.trim());
