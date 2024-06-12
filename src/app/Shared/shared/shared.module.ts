import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AgGridTableComponent],
  imports: [CommonModule, AgGridModule],
  exports: [AgGridTableComponent],
})
export class SharedModule {}
