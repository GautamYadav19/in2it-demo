import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './core/auth-guard.guard';
import { LoginComponent } from './core/login/login.component';

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
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('../app/DashBoard/product/product.module').then((x) => {
        return x.ProductModule;
      }),
  },
  {
    path: 'calender',
    loadChildren: () =>
      import('../app/DashBoard/calender/calender.module').then((x) => {
        return x.CalenderModule;
      }),
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
