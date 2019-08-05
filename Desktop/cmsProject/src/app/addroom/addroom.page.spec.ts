import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroomPage } from './addroom.page';

describe('AddroomPage', () => {
  let component: AddroomPage;
  let fixture: ComponentFixture<AddroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddroomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
