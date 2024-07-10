import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDbDetailComponent } from './product-db-detail/product-db-detail.component';
import { IconsModule } from 'src/app/Shared/icons/icons.module';

@NgModule({
  declarations: [ProductComponent, ProductDbDetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    AgGridModule,
    IconsModule,
  ],
  providers: [DatePipe],
})
export class ProductModule {}
