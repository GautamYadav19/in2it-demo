import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ColDef,
  ColumnState,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: './ag-grid-table.component.html',
  styleUrls: ['./ag-grid-table.component.css'],
})
export class AgGridTableComponent implements OnInit {
  @Input() rowData: any;
  @Input() colDefs!: ColDef[];
  @Output() GridReady: EventEmitter<any> = new EventEmitter<GridApi>();
  @Output() SelectionChanged: EventEmitter<any> = new EventEmitter();
  // @Output() cellClick: EventEmitter<any> = new EventEmitter();
  // @Output() dataShared: EventEmitter<any> = new EventEmitter();

  @Input() gridOptions!: GridOptions;
  @Input() pagination!: boolean;
  @Input() paginationPageSize!: number;
  @Input() paginationPageSizeSelector!: number;
  @Input() isRowSelectable!: any;
  @Input() getRowStyle!: any;
  @Input() rowStyle!: any;
  @Input() defaultcolDef!: ColDef;

  // @Input() addUserFlag: boolean = false;
  @Input() setDropDownVar: boolean = false;
  colDefList: any[] = [];

  // insare input ki jaghahum colDef ka bhi use kar skte hai

  gridAPi!: GridApi;
  constructor() {}

  ngOnInit(): void {
    this.showDropDownFn();
  }

  onGridReady(params: any) {
    this.gridAPi = params.api;
    this.GridReady.emit(params);
  }
  onSelectionChanged() {
    const selectRow = this.gridAPi.getSelectedRows();
    this.SelectionChanged.emit(selectRow);
  }
  // oncellClickedFn(...event: any) {
  //   console.log(event,"event");
    
  //   this.cellClick.emit(event);
  // }
  showDropDownFn() {
    this.colDefs?.forEach((col: any) => {
      const data = {
        colField: col.field,
        headerName: col.headerName,
        hide: false,
      };
      this.colDefList.push(data);
    });
  }
  toggleVisible(col: any) {
    col.hide = !col.hide;
    if (col.hide) {
      this.gridOptions.columnApi!.setColumnVisible(col.colField, false);
    } else {
      this.gridOptions.columnApi!.setColumnVisible(col.colField, true);
    }
  }
  // addUser() {
  //   this.dataShared.emit()
  // }

}
