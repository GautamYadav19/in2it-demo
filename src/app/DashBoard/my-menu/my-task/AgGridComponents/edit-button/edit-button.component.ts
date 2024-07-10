import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css'],
})
export class EditButtonComponent implements ICellRendererAngularComp {
  constructor() {
    console.log(this.params);
  }
  params: any;

  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
    console.log('ag', params);
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
}
