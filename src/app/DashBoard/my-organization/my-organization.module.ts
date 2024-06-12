import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrganizationRoutingModule } from './my-organization-routing.module';
import { SolutionAreasComponent } from './solution-areas/solution-areas.component';
import { FeatherModule } from 'angular-feather';
import { IconsModule } from 'src/app/Shared/icons/icons.module';
import { MiniheaderComponent } from './Shared/miniheader/miniheader.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsComponent } from './contacts/contacts.component';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'src/app/Shared/shared/shared.module';

@NgModule({
  declarations: [
    SolutionAreasComponent,
    MiniheaderComponent,
    OrgDetailsComponent,
    ContactsComponent,
  ],
  imports: [
    CommonModule,
    MyOrganizationRoutingModule,
    FeatherModule,
    IconsModule,
    NgbModule,
    FormsModule,
    NgbNavModule,
    ReactiveFormsModule,
    AgGridModule,
    SharedModule
  ],
})
export class MyOrganizationModule {}
