import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { NavTitle } from 'src/app/Shared/Interfaces/interface';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set tabNavigateName subject correctly', () => {
    const service = new DataService(); //instance
    const testData: NavTitle = { modalName: 'test', name: 'test name' }; //test data
    service.setTabnavigateName(testData);
    service.tabNavigateName.subscribe((value) => {
      expect(value).toEqual(testData);
    });
  });
  
it('should retrieve data from localStorage', () => {
  const testData = [{ id: 1, name: 'Task 1' }];
  localStorage.setItem('data', JSON.stringify(testData));
  const service = new DataService(); //instance
  const result = service.getTableData();
  expect(result).toEqual(testData);
});

it('should return null if localStorage is empty', () => {
  localStorage.removeItem('data');
  const service = new DataService(); //instance
  const result = service.getTableData();
  expect(result).toBeNull();
});

it('should insert a new task into localStorage', () => {
  const service = new DataService(); //instance
  const testData = [{ id: 1, name: 'Task 1' }];

  service.insertTask(testData);
  const storedData = JSON.parse(localStorage.getItem('data')!);
  expect(storedData).toContain(testData);
});
it('should delete a task from localStorage by ID', () => {
  // localStorage.removeItem('data');
  const service = new DataService(); //instance
  const testData = [
    { fieldId: 1, name: 'Task 1' },
    { fieldId: 2, name: 'Task 2' },
  ];
  localStorage.setItem('data', JSON.stringify(testData));

  service.deleteTask(1);//yaha yeah real function ko cll kar raha hain isliye ek data kam ayega
  const storedData = JSON.parse(localStorage.getItem('data')!);
  expect(
    storedData.find((task: any) => {
      task.fieldId === 1;
    })
  ).toBeUndefined();
});

it("should retrieve a task from localStorage by ID",()=>{
  const testData = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];
  localStorage.setItem('data',JSON.stringify(testData));
  const service =new DataService();

  const result =service.taskGetByID(1)
  expect(result).toEqual(testData[1])
})


});
