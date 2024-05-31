import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NavTitle } from 'src/app/Shared/Interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  public tabNavigateName = new Subject<NavTitle>();
  setTabnavigateName(data: NavTitle) {
    this.tabNavigateName.next(data);
  }

  getTableData() {
    return JSON.parse(localStorage.getItem('data')!);
  }
  insertTask(data: any) {
    const existingData = JSON.parse(localStorage.getItem('data')!) || [];
    existingData.push(data);
    localStorage.setItem('data', JSON.stringify(existingData));
  }
  deleteTask(id: any) {
    const existingData = JSON.parse(localStorage.getItem('data')!) || [];
    existingData.splice(id, 1);
    localStorage.setItem('data', JSON.stringify(existingData));
  }
  taskGetByID(id: any) {
    const existingData = JSON.parse(localStorage.getItem('data')!) || [];
    return existingData[id];
  }
}
