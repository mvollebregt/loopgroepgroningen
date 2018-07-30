import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikbordPageComponent } from './prikbord-page.component';

describe('PrikbordPageComponent', () => {
  let component: PrikbordPageComponent;
  let fixture: ComponentFixture<PrikbordPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrikbordPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikbordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
