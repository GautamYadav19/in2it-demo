import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { CustomCellComponent } from './ag-grid-table/custom-cell/custom-cell.component';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [AgGridTableComponent, CustomCellComponent],
  imports: [CommonModule, AgGridModule,IconsModule],
  exports: [AgGridTableComponent],
})
export class SharedModule {}
