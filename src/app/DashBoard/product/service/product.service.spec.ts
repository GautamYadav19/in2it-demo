import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    service.getProductData();
  });
  it('should be call setProductFlag()', () => {
    const testData = { id: 1 };
    service.setProductFlag(testData);
    service.productFlag.subscribe((data) => {
      expect(data).toBe(testData);
    });
  });
  it('should be call setOpenclickProduct()', () => {
    const testData = { id: 1 };
    service.setOpenclickProduct(testData);
    service.openclickProduct.subscribe((data) => {
      expect(data).toBe(testData);
    });
  });
});
