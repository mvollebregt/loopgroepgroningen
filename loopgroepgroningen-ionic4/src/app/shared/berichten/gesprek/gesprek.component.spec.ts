import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GesprekComponent} from './gesprek.component';
import {Bericht} from '../models/bericht';
import {By} from '@angular/platform-browser';
import {CustomDatePipe} from '../../shared/pipes/custom-date-pipe';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('GesprekComponent', () => {
  let component: GesprekComponent;
  let fixture: ComponentFixture<GesprekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GesprekComponent, CustomDatePipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GesprekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('moet het juiste aantal berichten tonen', () => {
    // als
    component.berichten = [{}, {}, {}] as Bericht[];
    fixture.detectChanges();
    // dan
    const cards = fixture.debugElement.queryAll(By.css('ion-card-content'));
    expect(cards.length).toEqual(3);
  });
});
