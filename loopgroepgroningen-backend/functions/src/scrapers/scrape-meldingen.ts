import {scrapeList, Scraper} from './scrape';

export function scrapeMeldingen(): Scraper<string[]> {
  // TODO: onderscheid info, warning, error in melding-object toevoegen?
  return scrapeList('#system-message-container li', element => element.textContent.trim());
}
