import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { CustomCellComponent } from './ag-grid-table/custom-cell/custom-cell.component';
import { IconsModule } from '../icons/icons.module';
import { CustomProductBtnComponent } from './ag-grid-table/custom-product-btn/custom-product-btn.component';
import { TableInputDescComponent } from './ag-grid-table/table-input-desc/table-input-desc.component';
import { TableInputNameComponent } from './ag-grid-table/table-input-name/table-input-name.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AgGridTableComponent, CustomCellComponent, CustomProductBtnComponent, TableInputDescComponent, TableInputNameComponent],
  imports: [CommonModule, AgGridModule,IconsModule,FormsModule],
  exports: [AgGridTableComponent],
})
export class SharedModule {}
