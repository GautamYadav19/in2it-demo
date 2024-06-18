import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
} from 'ag-grid-community';

@Component({
  selector: 'app-custom-cell',
  templateUrl: './custom-cell.component.html',
  styleUrls: ['./custom-cell.component.css'],
})
export class CustomCellComponent implements ICellRendererAngularComp {
  constructor() {}
  params: any;
  orgNames: any;
  fieldName: any;
  togglebtn: boolean = false;
  count: number = 0;
  gridApi!: GridApi;
  selectedRow: number | null = null; // Track the selected row index
  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
    if (
      params.context.parent === 'mytask' ||
      params.context.parent === 'contact'
    ) {
      this.fieldName = params.colDef?.field;
    }
    
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
    const data = this.params.data;
    this.params.context.parentComponent.navigateToOrganization(data);
  }

  getOrgMemberDataById() {
    this.params.context.parentComponent.getOrgMemberDataById(
      this.params.data.orgId,
      this.params.data.id,
      this.params.data
    );
  }
  // editTaskByIdProductDetails() {
  //   // this.toggle();
  // }
  // toggle() {
  //   // console.log('storeIndex', this.params.context.parentComponent.storeIndex);
  //   // console.log('new index', this.params.rowIndex);

  //   // this.togglebtn = !this.togglebtn;
  // }

  // onDeleteProductDetails() {
  //   // this.toggle();
  // }
  // store: number[] = [];
  // startEditing() {
  // //  console.log(this.params);
   
  // //   // this.count++;
  // //   this.toggle(); // This function toggles the edit mode
  //   this.params.context.parentComponent.onBtStartEditing(this.params.rowIndex);
    
  //   this.togglebtn =this.params.context.parentComponent.toggleBtn
  //   console.log(this.params.context.parentComponent.toggleBtn);
  // }

  // stopEditing() {

  //   // this.toggle();
  //   this.params.context.parentComponent.onBtStopEditing();
  //   this.togglebtn =this.params.context.parentComponent.toggleBtn

  // }

}
