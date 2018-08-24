import {Element} from 'jsdom';

export function toFormDetails(elements: Element[]): { action: string, inputs: any } {
  const firstElement = elements[0];
  const inputElements = firstElement.querySelectorAll('input');
  const inputValues = {};
  for (let i = 0; i < inputElements.length; i++) {
    const subnode = inputElements.item(i);
    inputValues[subnode.attributes['name'].value] = subnode.attributes['value'] && subnode.attributes['value'].value;
  }
  return {
    action: firstElement.getAttribute('action'),
    inputs: inputValues
  };
}
