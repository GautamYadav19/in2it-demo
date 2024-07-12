import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCellComponent } from './custom-cell.component';

describe('CustomCellComponent', () => {
  let component: CustomCellComponent;
  let fixture: ComponentFixture<CustomCellComponent>;
  let mockDataWithContextMytask: any = {
    colDef: jasmine.createSpy('colDef'),
    context: {
      parentComponent: jasmine.createSpyObj('ParentComponent', [
        'togglebtn',
        'editTaskById',
        'onDelete',
      ]),
      parent: 'mytask',
    },
  };
  let mockDataWithContextContact: any = {
    data:{orgId:1,id:1},
    context: {
      parent: 'contact',
      parentComponent: jasmine.createSpyObj('ParentComponent', [
        'navigateToOrganization',
        'getOrgMemberDataById',
      ]),
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomCellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCellComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call agInit() mytask', () => {
    component.agInit(mockDataWithContextMytask);
  });
  it('call agInit() contact', () => {
    component.agInit(mockDataWithContextContact);
  });
  it('call refresh', () => {
    component.refresh(mockDataWithContextContact);
  });

  it('editTaskByIdAgGrid', () => {
    component.params = mockDataWithContextMytask;
    component.editTaskByIdAgGrid();
    expect(
      component.params.context.parentComponent.togglebtn
    ).toHaveBeenCalled();
    expect(
      component.params.context.parentComponent.editTaskById
    ).toHaveBeenCalledWith(component.params);
  });
  it('onDeleteAgGrid', () => {
    component.params = mockDataWithContextMytask;
    component.onDeleteAgGrid();
    expect(
      component.params.context.parentComponent.onDelete
    ).toHaveBeenCalledWith(component.params);
  });
  it('navigateToOrganization', () => {
    component.params = mockDataWithContextContact;
    component.navigateToOrganizationCustomCell();
    expect(
      component.params.context.parentComponent.navigateToOrganization
    ).toHaveBeenCalledWith(component.params.data);
  });
  it('getOrgMemberDataById', () => {
    component.params = mockDataWithContextContact;
    component.getOrgMemberDataById();
    expect(
      component.params.context.parentComponent.getOrgMemberDataById
    ).toHaveBeenCalledWith(
      component.params.data.orgId,
      component.params.data.id,
      component.params.data
    );
  });
});
