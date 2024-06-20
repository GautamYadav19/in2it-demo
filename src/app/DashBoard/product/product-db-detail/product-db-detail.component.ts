import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../service/product.service';
import {
  ProductDBdetail,
  TableItem,
} from 'src/app/Interfaces/product-db-details';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import { CustomProductBtnComponent } from 'src/app/Shared/shared/ag-grid-table/custom-product-btn/custom-product-btn.component';
import { TableInputDescComponent } from 'src/app/Shared/shared/ag-grid-table/table-input-desc/table-input-desc.component';
import { TableInputNameComponent } from 'src/app/Shared/shared/ag-grid-table/table-input-name/table-input-name.component';

@Component({
  selector: 'app-product-db-detail',
  templateUrl: './product-db-detail.component.html',
  styleUrls: ['./product-db-detail.component.css'],
})
export class ProductDbDetailComponent implements OnInit {
  rowData!: any[];
  colDefs!: ColDef[];
  gridOptions!: GridOptions;
  gridApi!: GridApi;

  state: any;
  showProductList!: TableItem[];
  flag: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductDetails();
    this.gridOptions = {
      context: {
        parentComponent: this,
        parent: 'product-details',
      },
    };
  }
  localstorageData = JSON.parse(localStorage.getItem('productData')!);
  getProductDetails() {
    this.state = history.state;
    this.rowData = this.localstorageData.filter((data: any) => {
      return data.is_table_exist === true;
    });
    this.defineColDef();
  }

  defineColDef() {
    this.colDefs = [
      {
        headerName: 'Table ID',
        field: 'table_id.value',
        width: 170,
      },
      {
        headerName: 'Table Name',
        field: 'table_name.value',
        width: 170,
        cellRenderer: TableInputNameComponent,
      },
      {
        headerName: 'Table Description',
        field: 'description.value',
        width: 170,
        cellRenderer: TableInputDescComponent,
      },
      { headerName: 'Create On', field: 'created_on.value', width: 170 },
      { headerName: 'Create By', field: 'created_by.value', width: 170 },
      { headerName: 'Updated On', field: 'updated_on.value', width: 170 },
      { headerName: 'Updated By', field: 'updated_by.value', width: 170 },
      {
        headerName: 'Action',
        width: 170,
        cellRenderer: CustomProductBtnComponent,
      
      },
    ];
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    console.log(this.gridApi);
  }


  onBtStopEditing() {
    this.flag = false;

    this.gridApi.stopEditing();
  }
  store: any[]=[]

  onBtStartEditing(index: any) {
    this.flag = true;
    console.log("index",index);
    
this.store.push(index)
console.log(this.store,"store");
this.productService.setOpenclickProduct(this.store)
// this.store.forEach((data:any)=>{
//   this.gridApi.setFocusedCell(data, 'table_name.value');
//   this.gridApi.startEditingCell({
//     rowIndex: data,
//     colKey: 'table_name.value',
//   });
// })
 

  }
  save(data: any) {
    this.flag = false;

    this.onBtStopEditing();
    const index = this.localstorageData.findIndex((id: any) => {
      return id.table_id.value == data.table_id.value;
    });
    this.localstorageData[index] = {};
    this.localstorageData[index] = data;

    localStorage.setItem('productData', JSON.stringify(this.localstorageData));
  }
  cancel(data: any) {
    this.flag = false;
    this.gridApi.stopEditing();
    const index = this.localstorageData.findIndex((id: any) => {
      return id.table_id.value == data.table_id.value;
    });
    this.localstorageData[index] = this.localstorageData[index];
    localStorage.setItem('productData', JSON.stringify(this.localstorageData));
    this.getProductDetails();
  }

  delete(data: any) {
    this.flag = false;


    const index = this.localstorageData.findIndex((id: any) => {
      return id.table_id.value == data.table_id.value;
    });
    this.localstorageData.splice(index, 1);
    localStorage.setItem('productData', JSON.stringify(this.localstorageData));
    this.getProductDetails();
  }
}
