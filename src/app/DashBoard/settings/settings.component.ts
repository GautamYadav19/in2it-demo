import { Component, OnInit, Type } from '@angular/core';
import { IndexBtnCustomComponent } from './custom-component/index-btn-custom/index-btn-custom.component';
import { IndexParaComponent } from './custom-component/index-para/index-para.component';

interface ComponentItem {
  name: string;
  component: Type<any>;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  params = {
    parentRef: this,
  };
  ngOnInit(): void {}
  listOfElement: any = [
    { name: 'Para', component: IndexParaComponent },
    { name: 'button', component: IndexBtnCustomComponent },
  ];
  showListElement: any = [];
  para: any;
  editMode: boolean = false;
  shareData(data: any) {
    this.para = data;
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drag(event: DragEvent, name: string) {
    event.dataTransfer?.setData('componentName', name);
  }

  drop(event: DragEvent) {
    event.preventDefault();
    const itemData = event.dataTransfer?.getData('componentName');
    const item = itemData ? itemData : null;
    const componentData = this.listOfElement.find((c: any) => c.name === item);
    const uniqueId = this.generateUniqueId();
    this.showListElement.push({
      component: componentData.component,
      id: uniqueId,
    });
  }

  generateUniqueId(): string {
    const now = new Date();
    // Format date as YYYYMMDD
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    // Get the time in seconds since epoch
    const seconds = Math.floor(now.getTime() / 1000);
    // Optionally include milliseconds for more uniqueness
    const milliseconds = now.getMilliseconds();

    return `${date}-${seconds}-${milliseconds}`;
  }

  // Usage
  editComponent: any;
  makeComponentEdit(mode: any, id: any) {
    console.log(mode, id);
    // here we test only true
    this.editComponent = this.showListElement.find((c: any) => c.id === id);
  }
}
