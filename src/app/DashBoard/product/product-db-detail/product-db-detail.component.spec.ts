import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDbDetailComponent } from './product-db-detail.component';

describe('ProductDbDetailComponent', () => {
  let component: ProductDbDetailComponent;
  let fixture: ComponentFixture<ProductDbDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDbDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDbDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
