const baseUrl = 'https://www.loopgroepgroningen.nl';

export function urlFor(relativeUrl: string, queryParams: any = {}): string {
  const path = relativeUrl.startsWith(baseUrl) ? relativeUrl :
    relativeUrl.startsWith('/') ? baseUrl + relativeUrl :
      `${baseUrl}/${relativeUrl}`;
  const query = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
  return query ? `${path}?${query}` : path;
}
