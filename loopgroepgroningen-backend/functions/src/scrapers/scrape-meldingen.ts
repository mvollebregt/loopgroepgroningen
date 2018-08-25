import {scrapeList, Scraper} from './scrape';

export function scrapeMeldingen(): Scraper<string[]> {
  return scrapeList('#system-message-container .warning li', element => element.textContent.trim());
}
