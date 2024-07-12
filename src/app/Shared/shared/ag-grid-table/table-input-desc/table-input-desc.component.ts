import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-table-input-desc',
  templateUrl: './table-input-desc.component.html',
  styleUrls: ['./table-input-desc.component.css']
})
export class TableInputDescComponent implements ICellRendererAngularComp {
  fieldName:any
  params: any;
  constructor() {}
  
  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
    this.fieldName=params.colDef!.field
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

}
