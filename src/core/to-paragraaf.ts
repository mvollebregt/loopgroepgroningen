export function toParagraaf(element: Element): string[]{
  if (!element) {
    return [];
  } else {
    const childNodes = element.childNodes;
    let paragraaf: string[] = [];
    let lineBreaks = 0;
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i].nodeType === Node.TEXT_NODE) {
        if (lineBreaks > 1 && paragraaf.length) {
          paragraaf.push('');
        }
        paragraaf.push(childNodes[i].textContent.trim());
        lineBreaks = 0;
      } else {
        lineBreaks++;
      }
    }
    return paragraaf;
  }
}
