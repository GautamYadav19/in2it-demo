import { Component, Input, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: './ag-grid-table.component.html',
  styleUrls: ['./ag-grid-table.component.css']
})
export class AgGridTableComponent implements OnInit {
@Input() rowData :any;
@Input() colDefs!:ColDef[];

// @Output() onSelectionChanged =new EventEmitter() 
  constructor() { }

  ngOnInit(): void {
  }
  onGridReady(data:any){}
  onSelectionChanged(){}
}
