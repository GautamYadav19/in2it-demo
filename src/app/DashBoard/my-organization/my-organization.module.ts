import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrganizationRoutingModule } from './my-organization-routing.module';
import { SolutionAreasComponent } from './solution-areas/solution-areas.component';
import {  FeatherModule } from 'angular-feather';
import { IconsModule } from 'src/app/Shared/icons/icons.module';
import { MiniheaderComponent } from './Shared/miniheader/miniheader.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsComponent } from './contacts/contacts.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [SolutionAreasComponent, MiniheaderComponent, OrgDetailsComponent, ContactsComponent, FormComponent],
  imports: [
    CommonModule,
    MyOrganizationRoutingModule,
    FeatherModule,
    IconsModule,
    NgbModule,FormsModule,NgbNavModule, ReactiveFormsModule 
  ],
})
export class MyOrganizationModule {}
