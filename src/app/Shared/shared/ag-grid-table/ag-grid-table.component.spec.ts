import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTableComponent } from './ag-grid-table.component';

describe('AgGridTableComponent', () => {
  let component: AgGridTableComponent;
  let fixture: ComponentFixture<AgGridTableComponent>;
  const mockGridApi = {
    getSelectedRows: jasmine.createSpy('getSelectedRows').and.returnValue([{ id: 1, name: 'Test' }]) // Replace with your mock data
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgGridTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTableComponent);
    component = fixture.componentInstance;
    component.gridAPi=mockGridApi as any
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
  
});
