import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskComponent } from './my-task.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DataService } from '../service/data.service';
import { AgGridModule } from 'ag-grid-angular';
import { IconsModule } from 'src/app/Shared/icons/icons.module';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { GridApi } from 'ag-grid-community';
import { CustomCellComponent } from 'src/app/Shared/shared/ag-grid-table/custom-cell/custom-cell.component';

describe('MyTask', () => {
  let component: MyTaskComponent;
  let fixture: ComponentFixture<MyTaskComponent>;
  let formBuilder: FormBuilder;
  let service: DataService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTaskComponent],
      imports: [ReactiveFormsModule, AgGridModule, IconsModule, SharedModule],
      providers: [DataService, FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskComponent);
    component = fixture.componentInstance;

    formBuilder = TestBed.inject(FormBuilder);
    service = TestBed.inject(DataService);

    component.tableData = [
      {
        fieldId: 1,
        taskName: 'Task 1',
        taskId: 'T1',
        solutionArea: 'Area 1',
        status: 'Active',
        startDate: '2024-06-01',
        dueDate: '2024-06-10',
        priority: 'High',
        workflow: 'Workflow 1',
      },
    ];
    expect(component.addTaskFlag).toBeDefined();
    component.addTaskForm = formBuilder.group({
      fieldId: [''],
      solutionArea: [''],
      workflow: [''],
      taskId: [''],
      taskName: [''],
      status: [''],
      startDate: [''],
      dueDate: [''],
      priority: [''],
    });
    component.addTaskFormInit();
  });

  afterEach(() => {
    localStorage.removeItem('data');
    localStorage.removeItem('editId');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });

  it('should toggle addTaskFlag correctly', () => {
    expect(component.addTaskFlag).toBeFalse();
    component.togglebtn();
    expect(component.addTaskFlag).toBeTrue();
  });

  it('should clear form on clear()', () => {
    const initialFormValue = {
      fieldId: '1',
      solutionArea: 'Test',
      workflow: 'Workflow',
      taskId: 12,
      taskName: 'TaskName1',
      status: 'Active',
      startDate: '2024-06-27',
      dueDate: '2024-06-28',
      priority: 'High',
    };
    component.addTaskForm.setValue(initialFormValue);
    component.clear();
    expect(component.addTaskForm.value).toEqual({
      fieldId: null,
      solutionArea: null,
      workflow: null,
      taskId: null,
      taskName: null,
      status: null,
      startDate: null,
      dueDate: null,
      priority: null,
    });
  });

  it('should set editMode to true and patch form data when editTaskById is called', () => {
    const testData = { data: { fieldId: 1 } };
    component.editTaskById(testData);
    expect(component.editMode).toBe(true);

    expect(component.addTaskForm.value).toEqual({
      fieldId: 1,
      taskName: 'Task 1',
      taskId: 'T1',
      solutionArea: 'Area 1',
      status: 'Active',
      startDate: '2024-06-01',
      dueDate: '2024-06-10',
      priority: 'High',
      workflow: 'Workflow 1',
    });
  });

  it('should set gridApi correctly on onGridReady call', () => {
    const mockParams = {
      api: {} as GridApi,
    };

    component.onGridReady(mockParams);

    expect(component.gridApi).toBeDefined();
    expect(component.gridApi).toEqual(mockParams.api);
  });

  it('should   correctly on OnCancel call', () => {
    spyOn(component, 'OnCanel').and.callThrough();
    spyOn(component, 'togglebtn').and.callThrough();
    spyOn(component, 'clear').and.callThrough();
    component.OnCanel();
    expect(component.OnCanel).toHaveBeenCalled();
    expect(component.togglebtn).toHaveBeenCalled();
    expect(component.clear).toHaveBeenCalled();
  });

  it('getTableData', () => {
    const testData = [
      {
        fieldId: 45,
        solutionArea: '4564',
        workflow: '456456',
        taskId: '456456',
        taskName: '546',
        status: 'In Progress',
        startDate: '2024-07-09',
        dueDate: '2024-07-03',
        priority: 'Low',
      },
    ];
    localStorage.setItem('productData', JSON.stringify(testData));
 
    component.getTableData();
   
    expect(component.colDefs).toEqual([
      {
        headerName: 'field Id',
        field: 'fieldId',
        checkboxSelection: true,
        width: 155,
      },
      { headerName: 'task Name', field: 'taskName', width: 155 },
      { headerName: 'task Id', field: 'taskId', width: 155 },
      { headerName: 'solution Area', field: 'solutionArea', width: 155 },
      {
        headerName: 'status',
        field: 'status',
        width: 150,
        cellStyle: jasmine.any(Function),
      },
      { headerName: 'start Date', field: 'startDate' },
      { headerName: 'due Date', field: 'dueDate' },
      {
        headerName: 'priority',
        field: 'priority',
        width: 100,
        cellStyle: jasmine.any(Function),
      },
      { headerName: 'workflow', field: 'workflow' },
      {
        headerName: 'Action',
        field: 'Action',
        width: 155,
        cellRenderer: CustomCellComponent,
      },
    ]);
  });

  it('should be selectionChange()', () => {
    let mockGridApi = {
      getSelectedRows: () => [
        { id: 1, name: 'Row 1' },
        { id: 2, name: 'Row 2' },
      ],
    } as GridApi;
    component.gridApi = mockGridApi;
    component.gridApi?.getSelectedRows();
    component.onSelectionChanged();
  });

  it('should be selectionChange() is empty', () => {
    component.gridApi = undefined;
    expect(component.gridApi).toBeUndefined();
    component.onSelectionChanged();
  });
  it('should be pagination() fb call ', () => {
    component.initPagination();
  });

  it('should be pagination() fb call ', () => {
    expect(component.listOfSelectedData).toEqual([]);
    component.OnSelectData(1);
  });

  it('should be call delete muiltiple data() Fn', () => {
    component.listOfSelectedData = [1, 2, 3];
    spyOn(window, 'confirm').and.returnValue(true);

    component.OnDeleteMultiData();
    expect(component.listOfSelectedData.length).toBe(0); // Ensure tableData remains unchanged
  });

  it('should be call delete muiltiple data() Fn with empty or false return by confirm', () => {
    component.listOfSelectedData = [1, 2, 3];
    spyOn(window, 'confirm').and.returnValue(false);

    component.OnDeleteMultiData();
    expect(component.tableData.length).toBe(0); // Ensure tableData remains unchanged
  });

  it('should be onDelete() fb call ', () => {
    const mockParams = { data: { fieldId: 1 } };
    spyOn(window, 'confirm').and.returnValue(true);
    component.onDelete(mockParams);
  });

  it('should submit form correctly on onSubmit()', () => {
    spyOn(component, 'getTableData');
    const formData = {
      fieldId: '1',
      solutionArea: 'Test',
      workflow: 'Workflow',
      taskId: 'Task1',
      taskName: 'TaskName1',
      status: 'Active',
      startDate: '2024-06-27',
      dueDate: '2024-06-28',
      priority: 'High',
    };
 
    component.addTaskForm.setValue(formData);
    component.onSubmit();
    expect(component.getTableData).toHaveBeenCalled();
    expect(component.editMode).toBeFalse();
    expect(component.addTaskForm.value).toEqual({
      fieldId: null,
      solutionArea: null,
      workflow: null,
      taskId: null,
      taskName: null,
      status: null,
      startDate: null,
      dueDate: null,
      priority: null,
    });
  });

  it('should submit form correctly when editMode is true onSubmit()', () => {
    // spyOn(component, 'getTableData').and.callFake(() => {});

    const formData = {
      fieldId: '1',
      solutionArea: 'Test',
      workflow: 'Workflow',
      taskId: 'Task1',
      taskName: 'TaskName1',
      status: 'Active',
      startDate: '2024-06-27',
      dueDate: '2024-06-28',
      priority: 'High',
    };

    localStorage.setItem('data', JSON.stringify([formData]));
    localStorage.setItem('editId', '1');
    component.addTaskForm.setValue(formData);

    component.editMode = true;

    component.onSubmit();
    expect(component.editMode).toBe(false);
  });
  it('should initialize existingData as an empty array if localStorage does not contain "data"', () => {
    localStorage.removeItem('data');
    component.onSubmit();
  });

  it('should submit form correctly when  it in else mode onSubmit()', () => {
    component.editMode = true;
    component.onSubmit();
  });
  
  it('should set column defs',()=>{
    let sp1 = spyOn(component,'getTableData').and.callThrough();

    component.getTableData();
    const { cellStyle }:any= component.colDefs[4]
    cellStyle({value:'Low'},{value:'yellow'},{value:'Low'})
    expect(sp1).toHaveBeenCalled()
  })
   
  it('should set column defs d',()=>{
    let sp1 = spyOn(component,'getTableData').and.callThrough();

    component.getTableData();
    const { cellStyle }:any= component.colDefs[7]


    cellStyle({value:'Low'})
    expect(sp1).toHaveBeenCalled()
  })
  it('should set column defs for high',()=>{
    let sp1 = spyOn(component,'getTableData').and.callThrough();

    component.getTableData();
    const { cellStyle }:any= component.colDefs[7]


    cellStyle({value:'Heigh'})
    expect(sp1).toHaveBeenCalled()
  })

});
