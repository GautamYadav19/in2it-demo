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

@Component({
  selector: 'app-product-db-detail',
  templateUrl: './product-db-detail.component.html',
  styleUrls: ['./product-db-detail.component.css'],
})
export class ProductDbDetailComponent implements OnInit, OnChanges {
  rowData!: any[];
  colDefs!: ColDef[];
  gridOptions!: GridOptions;
  gridApi!: GridApi;

  state: any;
  showProductList!: TableItem[];
  defaultcolDef = {
    editable: true,
  };
  editType: 'fullRow' = 'fullRow';

  constructor(private productService: ProductService) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

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
        editable: false,
      },
      { headerName: 'Table Name', field: 'table_name.value', width: 170 },
      {
        headerName: 'Table Description',
        field: 'description.value',
        width: 170,
      },
      { headerName: 'Create On', field: 'created_on.value', width: 170 },
      { headerName: 'Create By', field: 'created_by.value', width: 170 },
      { headerName: 'Updated On', field: 'updated_on.value', width: 170 },
      { headerName: 'Updated By', field: 'updated_by.value', width: 170 },
      {
        headerName: 'Action',
        width: 170,
        cellRenderer: CustomProductBtnComponent,
        // cellRendererParams: {
        //   startEditing: this.onBtStartEditing.bind(this),
        // },
        editable: false,
      },
    ];
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    console.log(this.gridApi);
  }

  flag: boolean = false;

  onBtStopEditing() {
    this.flag = false;

    this.gridApi.stopEditing();
  }
  store!: any[];

  onBtStartEditing(index: any) {
    this.flag = true;

    this.gridApi.setFocusedCell(index, 'table_name.value');
    this.gridApi.startEditingCell({
      rowIndex: index,
      colKey: 'table_name.value',
    });
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
    // let localstorageData = JSON.parse(localStorage.getItem('productData')!);
    const index = this.localstorageData.findIndex((id: any) => {
      return id.table_id.value == data.table_id.value;
    });
    this.localstorageData[index] = this.localstorageData[index];
    localStorage.setItem('productData', JSON.stringify(this.localstorageData));
    this.getProductDetails();
  }
  delete(data: any) {
    this.flag = false;

    // let localstorageData = JSON.parse(localStorage.getItem('productData')!);

    const index = this.localstorageData.findIndex((id: any) => {
      return id.table_id.value == data.table_id.value;
    });
    this.localstorageData.splice(index, 1);
    localStorage.setItem('productData', JSON.stringify(this.localstorageData));
    this.getProductDetails();
  }
}
