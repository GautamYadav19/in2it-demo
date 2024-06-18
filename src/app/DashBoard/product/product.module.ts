import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDbDetailComponent } from './product-db-detail/product-db-detail.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductDbDetailComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    AgGridModule
  ]
})
export class ProductModule { }
