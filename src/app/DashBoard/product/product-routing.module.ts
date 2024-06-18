import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDbDetailComponent } from './product-db-detail/product-db-detail.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'tablelist', component: ProductDbDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
