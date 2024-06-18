import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductBtnComponent } from './custom-product-btn.component';

describe('CustomProductBtnComponent', () => {
  let component: CustomProductBtnComponent;
  let fixture: ComponentFixture<CustomProductBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomProductBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProductBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
