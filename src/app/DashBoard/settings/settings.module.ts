import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { HttpClientModule } from '@angular/common/http';
import { InputCustomComponent } from './custom-component/input-custom/input-custom.component';
import { FormsModule } from '@angular/forms';
import { AddComponentDirective } from 'src/app/Shared/add-component.directive';
import { DropDownCustomComponent } from './custom-component/drop-down-custom/drop-down-custom.component';
import { BtnCustomComponent } from './custom-component/index-btn-custom/btn-custom/btn-custom.component';
import { EditBtnComponent } from './custom-component/index-btn-custom/edit-btn/edit-btn.component';
import { IndexBtnCustomComponent } from './custom-component/index-btn-custom/index-btn-custom.component';
import { EditParaComponent } from './custom-component/index-para/edit-para/edit-para.component';
import { IndexParaComponent } from './custom-component/index-para/index-para.component';
import { ParaCustomComponent } from './custom-component/index-para/para-custom/para-custom.component';
import { DataTransferDirective } from './directive/data-transfer.directive';
import { EditDataTransferDirective } from './directive/edit-data-transfer.directive';

@NgModule({
  declarations: [
    SettingsComponent,
    InputCustomComponent,
    ParaCustomComponent,
    DropDownCustomComponent,
    BtnCustomComponent,
    DataTransferDirective,
    AddComponentDirective,
    EditParaComponent,
    EditBtnComponent,
    IndexBtnCustomComponent,
    IndexParaComponent,
    EditDataTransferDirective,
  ],
  imports: [CommonModule, SettingsRoutingModule, HttpClientModule, FormsModule],
})
export class SettingsModule {}
