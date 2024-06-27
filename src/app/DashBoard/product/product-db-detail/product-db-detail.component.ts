import { Component, OnInit } from '@angular/core';
import { TableItem } from 'src/app/Interfaces/product-db-details';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import { CustomProductBtnComponent } from 'src/app/Shared/shared/ag-grid-table/custom-product-btn/custom-product-btn.component';
import { TableInputNameComponent } from 'src/app/Shared/shared/ag-grid-table/table-input-name/table-input-name.component';
import { DatePipe } from '@angular/common';

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
  editmode: boolean = false;
  currentDate: string;
  constructor(private datePipe: DatePipe) {
    this.currentDate = this.transformDate(new Date());
  }

  transformDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
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
    const list = this.localstorageData.filter((data: any) => {
      return data.is_table_exist === true;
    });
    this.rowData = list.map((item: any) => {
      return { ...item, editMode: false };
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
        cellRenderer: TableInputNameComponent,
      },
      { headerName: 'Create On', field: 'created_on.value', width: 170 },
      { headerName: 'Create By', field: 'created_by.value', width: 170 },
      { headerName: 'Updated On', field: 'updated_on.value', width: 170 },
      { headerName: 'Updated By', field: 'updated_by.value', width: 170 },
      {
        headerName: 'Action',
        field: 'action',
        width: 170,
        cellRenderer: CustomProductBtnComponent,
      },
    ];
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  save(data: any) {
    const index = this.localstorageData.findIndex((id: any) => {
      return id?.table_id?.value == data?.table_id?.value;
    });
    this.localstorageData[index] = data;
    localStorage.setItem('productData', JSON.stringify(this.localstorageData));
  }
  // cancel(data: any) {
  //   const index = this.localstorageData.findIndex((item: any) => {
  //     return item.table_id?.value === data.table_id?.value;
  //   });

  //   this.localstorageData[index] = this.localstorageData[index];
  //   // this.getProductDetails();
  // }

  delete(data: any) {
    const index = this.localstorageData.findIndex((id: any) => {
      return id.table_id?.value == data.table_id?.value;
    });
    this.localstorageData.splice(index, 1);

    localStorage.setItem('productData', JSON.stringify(this.localstorageData));
    this.getProductDetails();
  }
  addNewUser() {
    // this.createMode=true
    const data = {
      createMode: true,
      is_table_exist: true,
      table_id: {
        value: Math.floor(Math.random() * 800),
        is_edit: false,
        type: 'integer',
      },
      table_type: {
        value: 'is_standard',
        is_edit: false,
        type: 'boolean',
      },
      table_name: {
        value: '',
        is_edit: true,
        type: 'char',
      },
      description: {
        value: '',
        is_edit: true,
        type: 'char',
      },
      attribute_count: {
        value: 7,
        is_edit: false,
        type: 'integer',
      },
      rows_count: {
        value: 5,
        is_edit: false,
        type: 'integer',
      },
      created_on: {
        value: this.currentDate,
        is_edit: false,
        type: 'datetime',
      },
      created_by: {
        value: 'Gautam',
        is_edit: false,
        type: 'many2one',
      },
      updated_on: {
        value: '23/06/2023',
        is_edit: false,
        type: 'datetime',
      },
      updated_by: {
        value: 'Shivank Tyagi',
        is_edit: false,
        type: 'many2one',
      },
      is_standard: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      is_active: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      property: {
        is_edit: true,
        is_delete: true,
      },
      related_table: [],
    };
    this.localstorageData.push(data);
    this.gridOptions.api?.applyTransaction({ add: [data] });
    localStorage.setItem('productData', JSON.stringify(this.localstorageData));
  }
  setDropDownVar: boolean = false;
  setDropDown() {
    this.setDropDownVar = !this.setDropDownVar;
  }
}
