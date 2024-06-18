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
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.getProductDetails();
    this.gridOptions = {
      context: {
        parentComponent: this,
        parent: 'product-details',
      },
    };
  }
  getProductDetails() {
    this.state = history.state;

    if (this.state?.data == undefined) {
      let localstorageData = JSON.parse(localStorage.getItem('productData')!);

      //  localstorageData = this.productService.getProductData().resData.data;
      this.rowData = localstorageData.filter((data: any) => {
        return data.is_table_exist === true;
      });
      // let getFormstorage =localStorage.setItem('productData', JSON.stringify(localstorageData));
      localStorage.setItem('productData', JSON.stringify(this.rowData));

      this.defineColDef();
    } else {
      // let tabledata = this.productService.getProductData().resData.data;
      let localstorageData = JSON.parse(localStorage.getItem('productData')!);

      const filterData = localstorageData.filter((data: any) => {
        return data.table_name.value === this.state.data[0].table_name.value;
      });

      filterData[0].is_table_exist = true;

      filterData[0].table_id = {
        value: Math.floor(Math.random() * 800),
        is_edit: false,
        type: 'integer',
      };

      filterData[0].created_on = {
        value: '17/06/2024',
        is_edit: false,
        type: 'datetime',
      };

      let showTableData = localstorageData.filter((data: any) => {
        return data.is_table_exist === true;
      });

      this.rowData = showTableData;
      // localStorage.setItem('productData', JSON.stringify(showTableData));
      localStorage.setItem('productData', JSON.stringify(this.rowData));

      this.defineColDef();
    }
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
    const index = this.rowData.findIndex((id: any) => {
      return id.table_id.value == data.table_id.value;
    });
    this.rowData[index] = {};
    this.rowData[index] = data;

    localStorage.setItem('productData', JSON.stringify(this.rowData));
  }
  cancel(data: any) {
    this.flag = false;
    this.gridApi.stopEditing();
    let localstorageData = JSON.parse(localStorage.getItem('productData')!);
    const index = localstorageData.findIndex((id: any) => {
      return id.table_id.value == data.table_id.value;
    });
    localstorageData[index] = localstorageData[index];
    localStorage.setItem('productData', JSON.stringify(localstorageData));
    this.getProductDetails();
  }
  delete(data:any){
    this.flag = false;

    let localstorageData = JSON.parse(localStorage.getItem('productData')!);

    const index = localstorageData.findIndex((id: any) => {
      return id.table_id.value == data.table_id.value;
    });
    localstorageData.splice(index,1)
    localStorage.setItem('productData', JSON.stringify(localstorageData));
    this.getProductDetails();

  }
}
