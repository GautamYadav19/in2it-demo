import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Table } from 'src/app/Interfaces/product-table.interface';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productTableData!: any[];
  showTableData!: Table[];
  selectedData!: any;

  colDefs: ColDef[] = [
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
  rowData!: any[];
  gridOptions: GridOptions = {
    isRowSelectable: (parms: any) => {
      return !parms.data.is_table_exist;
    },
    getRowStyle: (parms: any) => {
      if (parms.data.is_table_exist) {
        return { background: 'rgb(220, 223, 226)', opacity: 0.8 };
      }
      return;
    },
    rowSelection: 'multiple',
  };
  gridApi!: GridApi;
  isRowSelectable!: any;
  setDropDownVar: boolean = false;

  disableNextBtn!: boolean;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProductData();
  }
  SelectionChanged(event: any) {
    this.selectedData = event;
  }
  setDropDown() {
    this.setDropDownVar = !this.setDropDownVar;
  }
  getProductData() {
    let localstorageData = JSON.parse(localStorage.getItem('productData')!);
    if (!localstorageData) {
      this.productTableData = this.rowData =
        this.productService.getProductData().resData.data;
      localStorage.setItem(
        'productData',
        JSON.stringify(this.productTableData)
      );
      this.disableNextBtn = this.productTableData.some((data: Table) => {
        return data.is_table_exist === true;
      });
    } else {
      this.productTableData = this.rowData = localstorageData;
      this.disableNextBtn = this.productTableData.some((data: Table) => {
        return data.is_table_exist === true;
      });
    }
  }

  NavigateToRoute() {
    if (this.selectedData !== undefined) {
      const tableData = JSON.parse(localStorage.getItem('productData')!);
      for (let i = 0; i < this.selectedData?.length; i++) {
        this.selectedData[i].is_table_exist = true;
        this.selectedData[i].table_id = {
          value: Math.floor(Math.random() * 800),
          is_edit: false,
          type: 'integer',
        };

        this.selectedData[i].created_on = {
          value: '17/06/2024',
          is_edit: false,
          type: 'datetime',
        };
        console.log('tableData', tableData);

        const index = tableData.findIndex((data: any) => {
          return (
            data.table_name.value === this.selectedData[i].table_name.value
          );
        });

        tableData[index] = this.selectedData[i];
      }
      localStorage.setItem('productData', JSON.stringify(tableData));
    }
    const state = { data: this.selectedData };

    this.router.navigateByUrl('product/tablelist', { state });
  }
}
