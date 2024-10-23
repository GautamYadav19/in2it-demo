import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCustomComponent } from './btn-custom.component';

describe('BtnCustomComponent', () => {
  let component: BtnCustomComponent;
  let fixture: ComponentFixture<BtnCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
