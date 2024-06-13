import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: './ag-grid-table.component.html',
  styleUrls: ['./ag-grid-table.component.css'],
})
export class AgGridTableComponent implements OnInit {
  @Input() rowData: any;
  @Input() colDefs!: ColDef[];
  // @Output() onSelectionChanged = new EventEmitter();
  @Output() GridReady: EventEmitter<any> = new EventEmitter<GridApi>();
  @Output() SelectionChanged: EventEmitter<any> = new EventEmitter();
  @Output() cellClick: EventEmitter<any> = new EventEmitter();
  @Input() gridOptions! :GridOptions;

  gridAPi!: GridApi;
  constructor() {}

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridAPi = params.api;
    this.GridReady.emit(this.gridAPi);
  }
  onSelectionChanged() {
    const selectRow = this.gridAPi.getSelectedRows();
    this.SelectionChanged.emit(selectRow);
  }
  oncellClickedFn(...event: any) {
    this.cellClick.emit(event);
  }
}
