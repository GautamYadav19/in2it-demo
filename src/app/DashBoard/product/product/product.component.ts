import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import {
  ProductApiResponse,
  Table,
} from 'src/app/Interfaces/product-table.interface';
import { ColDef, GridApi, GridOptions, RowClassRules } from 'ag-grid-community';
import { ProductDBdetail } from 'src/app/Interfaces/product-db-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productTableData!: any[];
  showTableData!: Table[];
  colDefs!: ColDef[];
  rowData!: any[];
  gridOptions!: GridOptions;
  gridApi!: GridApi;
  isRowSelectable!: any;

  disableNextBtn!: boolean;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProductData();
    this.defineColDefs();
    this.defineGridOptions();
  }

  getProductData() {
    // this.productService
    //   .getProductData()
    //   .subscribe((data: ProductApiResponse) => {
    //     this.productTableData = data.resData.data;
    //     this.defineRowData(this.productTableData);
    //     console.log("first",this.productTableData);

    //   });
    this.productTableData = this.rowData =
      this.productService.getProductData().resData.data;
    console.log(this.productTableData);
    // let localstorageData=JSON.parse(localStorage.getItem('productData')!)
    // this.productTableData =localstorageData
    localStorage.setItem('productData', JSON.stringify(this.productTableData));
    this.disableNextBtn = this.productTableData.some((data: Table) => {
      return data.is_table_exist === false;
    });
  }

  defineColDefs() {
    this.colDefs = [
      {
        headerName: 'Table Name',
        field: 'table_name.value',
        width: 450,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
      },
      {
        headerName: 'Table Description',
        field: 'description.value',
        width: 450,
      },
      {
        headerName: 'Existing in Product List',
        field: 'is_table_exist',
        width: 450,
        valueFormatter: function (params) {
          return params.value ? 'Yes' : 'No';
        },
      },
    ];
  }

  // defineRowData(table: Table[]) {
  //   this.rowData = table;
  // }

  defineGridOptions() {
    this.gridOptions = {
      isRowSelectable: (parms: any) => {
        return !parms.data.is_table_exist;
      },
      getRowStyle: (parms: any) => {
        if (parms.data.is_table_exist) {
          return { background: 'rgb(220, 223, 226)', opacity: 0.8 };
        }
        return;
      },
    };
  }
  selectedData!: Table[];
  SelectionChanged(event: any) {
    console.log(event);
    this.selectedData = event;
  }
  NavigateToRoute() {
    // this.route.navigateByUrl('tablelist',{})
    const state = { data: this.selectedData };
    this.router.navigateByUrl('product/tablelist', { state });
  }
}
