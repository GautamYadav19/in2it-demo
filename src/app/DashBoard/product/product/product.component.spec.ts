import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductRoutingModule } from '../product-routing.module';
import { DatePipe } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { IconsModule } from 'src/app/Shared/icons/icons.module';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../service/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        SharedModule,
        AgGridModule,
        IconsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [DatePipe, ProductService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call oninit()', () => {
    component.ngOnInit();
    component.productTableData = [{ test: 'data', is_table_exist: true }];
  });
  it('selectionChanged()', () => {
    expect(component.selectedData).toBeUndefined();
    component.SelectionChanged(Event);
  });
  it('setDropDown', () => {
    component.setDropDown();
  });

  it('should retrieve productTableData from localStorage when un-available', () => {
    localStorage.clear();
    component.getProductData();
  });
  it('should retrieve productTableData from localStorage when available', () => {
    const mockLocalStorageData = [
      { id: 1, name: 'Product A', is_table_exist: true },
      { id: 2, name: 'Product B', is_table_exist: false },
    ];
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockLocalStorageData)
    );

    component.getProductData();
    expect(component.productTableData).toEqual(mockLocalStorageData);
    expect(component.rowData).toEqual(mockLocalStorageData);
    expect(localStorage.getItem).toHaveBeenCalledWith('productData');
    expect(component.disableNextBtn).toBeTrue();
  });

  it('should update localStorage and navigate to product/tablelist', () => {
    // Mock selectedData
    component.selectedData = [
      {
        table_name: { value: 'Table A' },
        is_table_exist: false,
        table_id: { value: 123, is_edit: false, type: 'integer' },
        created_on: { value: '17/06/2024', is_edit: false, type: 'datetime' },
      },
    ];

    // Mock localStorage.getItem and localStorage.setItem
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
    spyOn(localStorage, 'setItem').and.callFake(() => {});

    spyOn(router, 'navigateByUrl');

    component.NavigateToRoute();

    //   // Assertions
    expect(localStorage.getItem).toHaveBeenCalledWith('productData');
  });
  
  it('should be isRowSelectable()', () => {
    const params = {
      data: {
        is_table_exist: true,
      },
    };
    const { isRowSelectable }: any = component.gridOptions;
    isRowSelectable(params);
    const { getRowStyle }: any = component.gridOptions;
    getRowStyle(params);
  });
  it('should be isRowSelectable() null return', () => {
    const params = {
      data: {
        is_table_exist: false,
      },
    };

    const { getRowStyle }: any = component.gridOptions;
    getRowStyle(params);
  });

  it("valueFormatter if value YES",()=>{
    const {valueFormatter}:any =component.colDefs[2]
    const params = {
      data: {
        value: 'Yes',
      },
    };
    valueFormatter(params)
  })
  
  it("valueFormatter if value NO",()=>{
    const {valueFormatter}:any =component.colDefs[2]
    const params = {
        value: 'Yes',
    };
    valueFormatter(params)
  })
});
