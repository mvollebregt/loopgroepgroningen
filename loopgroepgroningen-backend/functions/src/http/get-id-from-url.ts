export function getIdFromUrl(url: string): string {
  const indexOfLastPart = url.lastIndexOf('/') + 1;
  return url.substring(indexOfLastPart);
}
