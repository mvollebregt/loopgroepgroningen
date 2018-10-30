import {Credentials, Session} from './api';
import {scrapeLoggedInSession, scrapeSession} from './scrapers/scrape-session';
import {EndpointDefinition} from './http/model/endpoint-definition';

const loginFormSelector = '.login form';

export const sessionEndpoint: EndpointDefinition<Credentials, Session> = {
  targetUrl: 'index.php/component/users/profile',
  formSelector: loginFormSelector,
  formNotAvailableHandler: scrapeLoggedInSession, // al ingelogd
  scraper: scrapeSession(loginFormSelector)
};
