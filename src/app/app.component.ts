import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'folder_structure_demo';
  constructor() {}
  obj: any = {
    data: {
      key: 'key 1',
      edit: {
        key: 'key 2',
        value: 'value',
      },
      t: {
        key: 'key 1',
      },
    },
    status: null,
    message: null,
  };

  ngOnInit(): void {
    this.keyValueFn(this.obj);
    console.log(this.newobj1);
  }
  newobj1: any = {};

  keyValueFn(obj: any) {
    if (typeof obj === 'object' && obj !== null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            this.keyValueFn(obj[key]);
          }

          if (key === 'key') {
            const value = obj.value !== undefined ? obj.value : null;
            this.newobj1[obj[key]] = value;
          }
        }
      }
    }

    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].hasOwnProperty('key')) {
          const value = obj[i].value !== undefined ? obj[i].value : null;
          this.newobj1[obj[i].key] = value;
          this.keyValueFn(obj[i]);
        }
      }
    }
  }
}
