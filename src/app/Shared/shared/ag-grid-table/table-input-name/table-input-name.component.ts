import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-table-input-name',
  templateUrl: './table-input-name.component.html',
  styleUrls: ['./table-input-name.component.css'],
})
export class TableInputNameComponent
  implements OnInit, ICellRendererAngularComp
{
  fieldName:any
  params: any;
  constructor() {}
  ngOnInit(): void {
  }
  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
    this.fieldName=params.colDef?.field
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }
}
