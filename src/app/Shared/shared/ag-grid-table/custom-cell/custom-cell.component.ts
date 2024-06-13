import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-cell',
  templateUrl: './custom-cell.component.html',
  styleUrls: ['./custom-cell.component.css'],
})
export class CustomCellComponent implements ICellRendererAngularComp {
  constructor() {}
  params: any;
  orgNames: any;
  fieldName:any;
  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
    this.fieldName=params.colDef?.field
    console.log(this.fieldName);
    
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  editTaskByIdAgGrid() {
    this.params.context.parentComponent.togglebtn();
    this.params.context.parentComponent.editTaskById(this.params);
  }

  onDeleteAgGrid() {
    this.params.context.parentComponent.onDelete(this.params);
  }
  navigateToOrganization() {
    const data=this.params.data
    console.log(data)
    this.params.context.parentComponent.navigateToOrganization(data);
  }
  getOrgMemberDataById() {
    console.log(this.params.data)
    this.params.context.parentComponent.getOrgMemberDataById(this.params.data.orgId,this.params.data.id,this.params.data);
  }
}
