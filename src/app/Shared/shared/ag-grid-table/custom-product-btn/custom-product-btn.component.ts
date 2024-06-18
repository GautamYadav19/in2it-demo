import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-product-btn',
  templateUrl: './custom-product-btn.component.html',
  styleUrls: ['./custom-product-btn.component.css'],
})
export class CustomProductBtnComponent
  implements OnInit, ICellRendererAngularComp
{
  params: any;
  flag!: boolean;
  gridApi!: GridApi;
  constructor() {}
  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
    this.gridApi = this.params.context.parentComponent.gridApi;
    this.flag = this.params.context.parentComponent.flag;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  ngOnInit(): void {}

  startEditing() {
    this.params.context.parentComponent.onBtStartEditing(this.params.rowIndex);
    this.flag = this.params.context.parentComponent.flag;
  }
  save() {
    this.params.context.parentComponent.save(this.params.data);
    this.flag = this.params.context.parentComponent.flag;
  }
  cancel() {
    this.params.context.parentComponent.cancel(this.params.data)
    this.flag = this.params.context.parentComponent.flag;
  }
  delete(){
    this.params.context.parentComponent.delete(this.params.data)
    this.flag = this.params.context.parentComponent.flag;
  }
}
