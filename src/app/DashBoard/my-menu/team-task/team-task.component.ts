import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import {
  CellValueChangedEvent,
  ColDef,
  ColumnApi,
  GridApi,
  GridOptions,
  GridReadyEvent,
  RowValueChangedEvent,
} from 'ag-grid-community';

@Component({
  selector: 'app-team-task',
  templateUrl: './team-task.component.html',
  styleUrls: ['./team-task.component.css'],
})
export class TeamTaskComponent {
  // gridOptions!: GridOptions;
  // gridApi!:GridApi
  // public editType: "fullRow" = "fullRow";
  // constructor(private service: DataService) {
  //   this.setNavTitle();
  // }
  // rowData = [
  //   { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  //   { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  //   { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  // ];

  // colDefs: ColDef[] = [
  //   {
  //     field: 'make',
  //     headerCheckboxSelection: true,
  //     checkboxSelection: true,
  //     showDisabledCheckboxes: true,
  //   },
  //   { field: 'model' },
  //   {
  //     field: 'price',
  //     cellStyle: { color: 'green' },
  //   },
  //   { field: 'electric' },
  // ];

  // ngOnInit(): void {
  //   console.log(this.colDefs);
  //   this.getRowStyle = (params: any) => {
  //     if (params.data.electric) {
  //       return { opacity: 0.8 };
  //     }
  //     return;
  //   };
  //   this.gridOptions = {
  //     isRowSelectable: (parms: any) => {
  //       return !parms.data.electric;
  //     },
  //   getRowStyle:(parms:any)=>{
  //     if(!parms.data.electric){

  //       return { background: 'red' };
  //     }
  //     return
  //   }

  //   };
  // }

  // setNavTitle() {
  //   this.service.setTabnavigateName({ name: 'Menu', modalName: 'Team Task' });
  // }
  // onBtStopEditing() {
  //   this.gridApi.stopEditing();
  // }

  // onBtStartEditing() {
  //   this.gridApi?.setFocusedCell(1, "make");
  //   this.gridApi?.startEditingCell({
  //     rowIndex: 1,
  //     colKey: "make",
  //   });
  // }
//   private gridApi!: GridApi;
//   gridOption!:GridOptions
//   public themeClass: string = 'ag-theme-quartz';

//   public columnDefs: ColDef[] = [
//     {
//       field: 'make',
//       cellEditor: 'agSelectCellEditor',
//       cellEditorParams: {
//         values: ['Porsche', 'Toyota', 'Ford', 'AAA', 'BBB', 'CCC'],
//       },
//     },
//     { field: 'model' },
//     { field: 'field4', headerName: 'Read Only', editable: false },
//     { field: 'price' },
//     {
//       headerName: 'Suppress Navigable',
//       field: 'field5',
//       suppressNavigable: true,
//       minWidth: 200,
//     },
//     { headerName: 'Read Only', field: 'field6', editable: false },
//   ];

//   public defaultColDef: ColDef = {
//     flex: 1,
//     editable: true,
//   };

//   public editType: 'fullRow' = 'fullRow';

//   public rowData: any[] | null = getRowData();
//   columnApi!: any;
//   onBtStopEditing() {
//     this.gridOption?.columnApi?.setColumnVisible('model',false)
//   }

//   onBtStartEditing() {
//     this.gridApi.setFocusedCell(1, 'make');
//     this.gridApi.startEditingCell({
//       rowIndex: 1,
//       colKey: 'make',
//     });
//   }

//   onGridReady(params: GridReadyEvent) {
//     this.gridApi = params.api;
//     this.columnApi=params.columnApi
//   }
// }

// function getRowData() {
//   const rowData = [];
//   for (let i = 0; i < 10; i++) {
//     rowData.push({
//       make: 'Toyota',
//       model: 'Celica',
//       price: 35000 + i * 1000,
//       field4: 'Sample XX',
//       field5: 'Sample 22',
//       field6: 'Sample 23',
//     });
//     rowData.push({
//       make: 'Ford',
//       model: 'Mondeo',
//       price: 32000 + i * 1000,
//       field4: 'Sample YY',
//       field5: 'Sample 24',
//       field6: 'Sample 25',
//     });
//     rowData.push({
//       make: 'Porsche',
//       model: 'Boxster',
//       price: 72000 + i * 1000,
//       field4: 'Sample ZZ',
//       field5: 'Sample 26',
//       field6: 'Sample 27',
//     });
//   }
//   return rowData;
}
