import { Component, Input, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-aggrid-spike',
  templateUrl: './aggrid-spike.component.html',
  styleUrls: ['./aggrid-spike.component.css'],
})
export class AggridSpikeComponent implements OnInit {
  @Input() rowData: any;
  @Input() colDef!: ColDef[];
  @Input() gridOptions!: GridOptions;
  
  constructor() {}

  ngOnInit(): void {}
}
