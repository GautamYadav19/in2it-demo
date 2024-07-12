import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInputDescComponent } from './table-input-desc.component';

describe('TableInputDescComponent', () => {
  let component: TableInputDescComponent;
  let fixture: ComponentFixture<TableInputDescComponent>;
  let params: any = {
    colDef: jasmine.createSpy('colDefs'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableInputDescComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInputDescComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call agInit()', () => {
    component.agInit(params);
  });
  it("should be refresh return", ()=>{
    component.refresh(params)
  })
});
