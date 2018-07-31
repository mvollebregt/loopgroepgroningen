// De bedoeling is om dit uiteindelijk overal te vervangen door de Rich Content Builder

export function toParagraaf(element: Element): string[] {
  if (!element) {
    return [];
  } else {
    const childNodes = element.childNodes;
    let paragraaf: string[] = [];
    let lineBreaks = 0;
    for (let i = 0; i < childNodes.length; i++) {
      const textContent = childNodes[i].textContent.trim();
      if (textContent.length) {
        if (lineBreaks > 1 && paragraaf.length) {
          paragraaf.push('');
        }
        paragraaf.push(textContent);
        lineBreaks = 0;
      } else {
        lineBreaks++;
      }
    }
    return paragraaf;
  }
}
