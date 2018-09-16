import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {By} from '@angular/platform-browser';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {SectionedListComponent} from './sectioned-list.component';
import {OpknipperService} from '../opknipper.service';
import createSpyObj = jasmine.createSpyObj;

interface TestItem {
  naam: string;
  sectie: string;
}

describe('SectionedListComponent', () => {

  let component: SectionedListComponent<TestItem>;
  let fixture: ComponentFixture<SectionedListComponent<TestItem>>;

  const opknipperService = createSpyObj<OpknipperService>('OpknipperService', ['maakSecties']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionedListComponent],
      providers: [{provide: OpknipperService, useValue: opknipperService}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionedListComponent) as ComponentFixture<SectionedListComponent<TestItem>>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('moet het juiste aantal secties tonen', () => {
    // als
    opknipperService.maakSecties.and.returnValue([{titel: 'sectie 1', inhoud: []}, {titel: 'sectie 2', inhoud: []}]);
    component.ngOnChanges();
    fixture.detectChanges();
    // dan
    const gerenderdeSectieTitels = fixture.debugElement.queryAll(By.css('ion-list-header'));
    expect(gerenderdeSectieTitels.length).toEqual(2);
  });
});
