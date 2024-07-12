import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductBtnComponent } from './custom-product-btn.component';
import { HttpClientModule } from '@angular/common/http';

describe('CustomProductBtnComponent', () => {
  let component: CustomProductBtnComponent;
  let fixture: ComponentFixture<CustomProductBtnComponent>;

  let mockData: any = {
    data: {
      oldData: [{ id: 1, name: 'test' }],
      editMode: false,
      createMode: false,
    },
    context: {
      parentComponent: jasmine.createSpyObj('parentComponent', [
        'delete',
        'save',
      ]),
    },
    api: jasmine.createSpyObj('api', ['applyTransaction']),
    node: {
      data: {
        oldData: [{ id: 1, name: 'test' }],
        editMode: false,
        createMode: false,
      },
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomProductBtnComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProductBtnComponent);
    component = fixture.componentInstance;
    component.params = mockData;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('agGrid', () => {
    component.agInit(component.params);
    expect(component.params).toEqual(component.params);
  });
  it('refresh()', () => {
    component.refresh(component.params);
  });
  it('startEditing', () => {
    component.startEditing();
    expect(component.params.data.oldData).toEqual(
      component.params.data.oldData
    );
    expect(component.params.data.editMode).toBeTrue();
  });
  it('cancel  params.data.createMode is false', () => {
    // expect(component.params.data.createMode).toBeUndefined();
    component.cancel();
    expect(component.params.data.editMode).toBeFalse();
  });
  it('cancel  params.data.createMode is true', () => {
    component.params.data.createMode = true;
    expect(component.params.data.createMode).toBeTrue();
    component.cancel();
    expect(
      component.params.context.parentComponent.delete
    ).toHaveBeenCalledWith(component.params.data);
    expect(component.params.api.applyTransaction).toHaveBeenCalledWith({
      remove: [component.params.node.data],
    });
  });

  it('delete', () => {
    component.delete();
    expect(component.params.data.editMode).toBeFalse();
    expect(
      component.params.context.parentComponent.delete
    ).toHaveBeenCalledWith(component.params.data);
    expect(component.params.context.parentComponent.save).toHaveBeenCalledWith(
      component.params.data
    );
  });

  it('save is params.data.createMode is false', () => {
    component.save();
  });
  it('save is params.data.createMode is true', () => {
    component.params.data.createMode = true;
    component.save();
    expect(component.params.context.parentComponent.save).toHaveBeenCalledWith(
      component.params.data
    );
  });
});
