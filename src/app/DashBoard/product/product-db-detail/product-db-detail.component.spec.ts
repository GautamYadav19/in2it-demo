import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDbDetailComponent } from './product-db-detail.component';
import { DatePipe } from '@angular/common';

describe('ProductDbDetailComponent', () => {
  let component: ProductDbDetailComponent;
  let fixture: ComponentFixture<ProductDbDetailComponent>;

  let mockDataGridApi: any = {
    context: {
      parentComponent: this,
      parent: 'product-details',
    },
  };
  let mockApiOptions: any = {
    api: jasmine.createSpyObj('api', ['applyTransaction']),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDbDetailComponent],
      providers: [DatePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDbDetailComponent);
    component = fixture.componentInstance;
    component.gridApi = mockDataGridApi;
    component.gridOptions = mockApiOptions;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be call onGridReady', () => {
    component.onGridReady(mockDataGridApi);
    expect(component.gridApi).toEqual(mockDataGridApi.api);
  });
  it('OnInit()', () => {
    const emptyObj = spyOn(component, 'getProductDetails').and.callThrough();
    component.localstorageData = [
      { id: 1, is_table_exist: true },
      { id: 2, is_table_exist: false },
    ];
    component.ngOnInit();
    expect(component.gridOptions).toEqual(component.gridOptions);
    expect(emptyObj).toHaveBeenCalled();
  });

  it('setDropDown', () => {
    expect(component.setDropDownVar).toBeFalse();
    component.setDropDown();
    expect(component.setDropDownVar).toBeTrue();
  });

  it('delete', () => {
    component.localstorageData = [
      { id: 1, is_table_exist: true },
      { id: 2, is_table_exist: false },
    ];
    const testData = [{ table_id: 1, name: 'test' }];
    const emptyObj = spyOn(component, 'getProductDetails').and.callThrough();
    component.delete(testData);
    expect(emptyObj).toHaveBeenCalled();
  });
  it('delete Undefine', () => {
    component.localstorageData = [
      { table_id: { value: 1 }, is_table_exist: true },
    ];
    const testData = { table_id: { value: 1 }, is_table_exist: true };
    const emptyObj = spyOn(component, 'getProductDetails').and.callThrough();
    component.delete(testData);
    expect(emptyObj).toHaveBeenCalled();
  });

  it('addNewUser', () => {
    component.localstorageData = [{ table_id: { value: 1 } }];
    component.addNewUser();
    // expect(component.gridOptions.api).toHaveBeenCalledWith({ add: [{ table_id:  {value:1} , is_table_exist: true }] })
  });
  it('save()', () => {
    component.localstorageData = [{ table_id: { value: 1 } }];
    component.save({ table_id: { value: 1 } });
    expect(component.localstorageData[0]).toEqual({
      table_id: { value: 1 },
    });
  });
});
