import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMenuRoutingModule } from './my-menu-routing.module';
import { MyTaskComponent } from './my-task/my-task.component';
import { TeamTaskComponent } from './team-task/team-task.component';
import { IconsModule } from 'src/app/Shared/icons/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { EditButtonComponent } from './my-task/AgGridComponents/edit-button/edit-button.component';
import { SharedModule } from 'src/app/Shared/shared/shared.module';

@NgModule({
  declarations: [
    MyTaskComponent,
    TeamTaskComponent,
    EditButtonComponent
  ],
  imports: [
    CommonModule,
    MyMenuRoutingModule,
    ReactiveFormsModule,
    IconsModule,AgGridModule,
    FormsModule,
    SharedModule
  ]
})
export class MyMenuModule { }
