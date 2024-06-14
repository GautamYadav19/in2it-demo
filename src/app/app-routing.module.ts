import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  {
    path: 'menu',
    loadChildren: () =>
      import('../app/DashBoard/my-menu/my-menu.module').then((x) => {
        return x.MyMenuModule;
      }),
  },
  {
    path: 'organization',
    loadChildren: () =>
      import('../app/DashBoard/my-organization/my-organization.module').then(
        (x) => {
          return x.MyOrganizationModule;
        }
      ),
  },
  {
    path: 'designer',
    loadChildren: () =>
      import('../app/DashBoard/designer/designer.module').then((x) => {
        return x.DesignerModule;
      }),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('../app/DashBoard/product/product.module').then((x) => {
        return x.ProductModule;
      }),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
