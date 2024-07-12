import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInputNameComponent } from './table-input-name.component';

describe('TableInputNameComponent', () => {
  let component: TableInputNameComponent;
  let fixture: ComponentFixture<TableInputNameComponent>;
  const mockDataWithColDef: any = {
    colDef: jasmine.createSpy('colDef'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableInputNameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInputNameComponent);
    component = fixture.componentInstance;
    component.params = mockDataWithColDef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call agrid()', () => {
    component.agInit(mockDataWithColDef);
    expect(component.params).toEqual(mockDataWithColDef)
  });
  it('call refresh return',()=>{
    component.refresh(mockDataWithColDef)
  })
});
