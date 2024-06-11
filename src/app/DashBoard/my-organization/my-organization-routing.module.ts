import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiniheaderComponent } from './Shared/miniheader/miniheader.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  { path: '', component: MiniheaderComponent },
  {
    path: 'contact',
    component: ContactsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrganizationRoutingModule {}
