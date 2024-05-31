import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMenuRoutingModule } from './my-menu-routing.module';
import { MyTaskComponent } from './my-task/my-task.component';
import { TeamTaskComponent } from './team-task/team-task.component';
import { IconsModule } from 'src/app/Shared/icons/icons.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyTaskComponent,
    TeamTaskComponent
  ],
  imports: [
    CommonModule,
    MyMenuRoutingModule,
    ReactiveFormsModule,
    IconsModule
  ]
})
export class MyMenuModule { }
