import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css'],
})
export class EditButtonComponent implements ICellRendererAngularComp {
  addTaskFlag: boolean=false;
  constructor() {}
  params: any;

  agInit(params: ICellRendererParams<any, any>): void {
    console.log("ag",this.addTaskFlag,params)
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  editTaskByIdAgGrid() {
    if (this.params.editTaskByIdAgGrid instanceof Function) {
      this.params.editTaskByIdAgGrid(this.params);
    }
    
  }

  togglebtnAgGrid() {
    if (this.params.togglebtnAgGrid instanceof Function) {
      this.params.togglebtnAgGrid(this.params);
    }
  }

  onDeleteAgGrid() {
    if (this.params.onDeleteAgGrid instanceof Function) {
      this.params.onDeleteAgGrid(this.params);
    }
  }
}
