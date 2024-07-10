import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDbDetailComponent } from './product-db-detail.component';
import { DatePipe } from '@angular/common';

describe('ProductDbDetailComponent', () => {
  let component: ProductDbDetailComponent;
  let fixture: ComponentFixture<ProductDbDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDbDetailComponent ]
      ,providers:[DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDbDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
