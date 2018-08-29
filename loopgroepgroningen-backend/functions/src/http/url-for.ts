const baseUrl = 'http://www.loopgroepgroningen.nl';

export function urlFor(relativeUrl: string): string {
  return relativeUrl.startsWith(baseUrl) ? relativeUrl :
    relativeUrl.startsWith('/') ? baseUrl + relativeUrl :
      `${baseUrl}/${relativeUrl}`;
}
