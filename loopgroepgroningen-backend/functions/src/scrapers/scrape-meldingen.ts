import {scrapeList, Scraper} from './scrape';

export const scrapeMeldingen: Scraper<string[]> =
  // TODO: onderscheid info, warning, error in melding-object toevoegen?
  scrapeList('#system-message-container li', element => element.textContent.trim());
