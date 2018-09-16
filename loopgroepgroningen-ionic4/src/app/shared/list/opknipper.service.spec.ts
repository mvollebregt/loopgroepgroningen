import {OpknipperService} from './opknipper.service';

describe('OpknipperService', () => {

  const opknipperService = new OpknipperService();

  function getSectieTitel(item: { sectie: string }) {
    return item.sectie;
  }

  it('moet van een enkel item een enkele sectie maken', () => {
    // gegeven
    const items = [{naam: 'naam', sectie: 'sectietitel'}];
    // als
    const secties = opknipperService.maakSecties(items, getSectieTitel);
    // dan
    expect(secties).toEqual([{titel: 'sectietitel', inhoud: items}]);
  });

  it('moet van meerdere items in dezelfde sectie een enkele sectie maken', () => {
    // gegeven
    const sectietitel = 'zelfde sectie';
    const items = [
      {naam: 'item 1', sectie: sectietitel},
      {naam: 'item 2', sectie: sectietitel},
      {naam: 'item 3', sectie: sectietitel}];
    // als
    const secties = opknipperService.maakSecties(items, getSectieTitel);
    // dan
    expect(secties).toEqual([{titel: sectietitel, inhoud: items}]);
  });

  it('moet items met dezelfde sectietitel bij elkaar groeperen', () => {
    // gegeven
    const sectie1 = [
      {naam: 'item 1', sectie: 'sectie 1'},
      {naam: 'item 2', sectie: 'sectie 1'}];
    const sectie2 = [
      {naam: 'item 3', sectie: 'sectie 2'},
      {naam: 'item 4', sectie: 'sectie 2'}];
    // als
    const secties = opknipperService.maakSecties([...sectie1, ...sectie2], getSectieTitel);
    // dan
    expect(secties).toEqual([
      {titel: 'sectie 1', inhoud: sectie1},
      {titel: 'sectie 2', inhoud: sectie2}]);
  });

  it('moet geen nieuwe sectie maken voor een item zonder sectietitel', () => {
    // gegeven
    const data = [
      {naam: 'item 1', sectie: 'sectie 1'},
      {naam: 'item 2', sectie: undefined}];
    // als
    const secties = opknipperService.maakSecties(data, getSectieTitel);
    // dan
    expect(secties).toEqual([{titel: 'sectie 1', inhoud: data}]);
  });

  it('moet een sectie zonder sectietitel aan het begin van de lijst toevoegen aan de eerste sectie', () => {
    // gegeven
    const data = [
      {naam: 'item 1', sectie: undefined},
      {naam: 'item 2', sectie: 'sectie 1'}];
    // als
    const secties = opknipperService.maakSecties(data, getSectieTitel);
    // dan
    expect(secties).toEqual([{titel: 'sectie 1', inhoud: data}]);
  });


});
