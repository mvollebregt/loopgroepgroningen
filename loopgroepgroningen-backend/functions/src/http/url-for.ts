const baseUrl = 'https://www.loopgroepgroningen.nl';

export function urlFor(relativeUrl: string, pathParams: string = '', queryParams: any = {}): string {
  const baseUrlIfNecessary = relativeUrl.startsWith(baseUrl) ? '' : baseUrl;
  const path = withSlashes(baseUrlIfNecessary, relativeUrl, pathParams);
  const query = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
  return query ? `${path}?${query}` : path;
}

function withSlashes(...pathParts: string[]) {
  return pathParts.filter(part => !!part).map(trimSlashes).join('/');
}

function trimSlashes(pathPart: string) {
  return pathPart.replace(/^[/]+|[/]+$/g, '');
}

