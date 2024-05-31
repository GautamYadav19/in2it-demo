import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignerRoutingModule } from './designer-routing.module';
import { DesignerComponent } from './designer.component';
import { IconsModule } from 'src/app/Shared/icons/icons.module';


@NgModule({
  declarations: [
    DesignerComponent
  ],
  imports: [
    CommonModule,
    DesignerRoutingModule,
    IconsModule
  ]
})
export class DesignerModule {
  
 }
