import {Scraper} from '../../scrapers/scrape';
import {HandlerFunction} from './handler-function';

export interface EndpointDefinition<I, O> {
  targetUrl: string;
  scraper: Scraper<O>;
  restricted?: boolean;
  inputMapper?: (input: I) => any;
  formSelector?: string;
  formNotAvailableHandler?: (inputPage: string) => O;
  methods?: {
    get?: HandlerFunction<O> | boolean;
    post?: HandlerFunction<O> | boolean;
  }
}
