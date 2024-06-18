import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { CustomCellComponent } from './ag-grid-table/custom-cell/custom-cell.component';
import { IconsModule } from '../icons/icons.module';
import { CustomProductBtnComponent } from './ag-grid-table/custom-product-btn/custom-product-btn.component';

@NgModule({
  declarations: [AgGridTableComponent, CustomCellComponent, CustomProductBtnComponent],
  imports: [CommonModule, AgGridModule,IconsModule],
  exports: [AgGridTableComponent],
})
export class SharedModule {}
