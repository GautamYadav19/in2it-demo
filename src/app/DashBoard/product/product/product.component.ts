import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import {
  ProductApiResponse,
  Table,
} from 'src/app/Interfaces/product-table.interface';
import { ColDef, GridApi, GridOptions, RowClassRules } from 'ag-grid-community';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productTableData!: Table[];
  showTableData!: Table[];
  colDefs!: ColDef[];
  rowData!: ProductApiResponse;
  gridOptions!: GridOptions;
  gridApi!: GridApi;
  isRowSelectable!: any;

  disableNextBtn!: boolean;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductData();
    this.defineColDefs();
    this.defineGridOptions();
  }

  getProductData() {
    this.productService
      .getProductData()
      .subscribe((data: ProductApiResponse) => {
        this.productTableData = data.resData.data;
        this.defineRowData(this.productTableData);
        this.disableNextBtn = this.productTableData.some((data: Table) => {
          return data.is_table_exist === false;
        });
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

  defineRowData(table: Table[]) {
    this.showTableData = table;
  }

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
}
