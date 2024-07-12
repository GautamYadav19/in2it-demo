import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTableComponent } from './ag-grid-table.component';
import { GridApi, GridOptions } from 'ag-grid-community';

describe('AgGridTableComponent', () => {
  let component: AgGridTableComponent;
  let fixture: ComponentFixture<AgGridTableComponent>;
  const mockGridApi = {
    getSelectedRows: jasmine
      .createSpy('getSelectedRows')
      .and.returnValue([{ id: 1, name: 'Test' }]), // Replace with your mock data
  };
  const mockGridOptions1: GridOptions = {
    columnApi: {
      setColumnVisible: jasmine.createSpy('setColumnVisible'),
    } as any, // Mocking as any because setColumnVisible is not fully defined here
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgGridTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTableComponent);
    component = fixture.componentInstance;
    component.gridAPi = mockGridApi as any;
    component.gridOptions = mockGridOptions1;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call ngOninit()', () => {
    spyOn(component, 'showDropDownFn').and.callThrough();
    component.ngOnInit();
    expect(component.showDropDownFn).toHaveBeenCalled();
  });

  it('showDropDownFn()', () => {
    const testData = [{ field: 'test field', headerName: 'test' }];
    const expectData = {
      colField: 'test field',
      headerName: 'test',
      hide: false,
    };
    component.colDefs = testData;
    component.showDropDownFn();
    expect(component.colDefList).toEqual([expectData]);
  });

  it('should emit selected rows on selection change', () => {
    const emitSpy = spyOn(component.SelectionChanged, 'emit'); // Spy on emit method of SelectionChanged EventEmitter

    component.onSelectionChanged();

    expect(mockGridApi.getSelectedRows).toHaveBeenCalled(); // Verify that getSelectedRows was called
    expect(emitSpy).toHaveBeenCalledWith([{ id: 1, name: 'Test' }]); // Verify that emit was called with the correct argument
  });

  it('should assign gridApi and emit GridReady event', () => {
    const mockDataParams: GridApi = {} as any;
    const emitSpy = spyOn(component.GridReady, 'emit');

    component.onGridReady({ api: mockDataParams });

    expect(component.gridAPi).toEqual(mockDataParams);
    expect(emitSpy).toHaveBeenCalledWith({ api: mockDataParams });
  });

  it('call toggleVisible is true', () => {
    const testDataCol = { hide: true };
    component.toggleVisible(testDataCol);
  });
  it('call toggleVisible is false', () => {
    const testDataCol = { hide: false };
    component.toggleVisible(testDataCol);
  });
});
