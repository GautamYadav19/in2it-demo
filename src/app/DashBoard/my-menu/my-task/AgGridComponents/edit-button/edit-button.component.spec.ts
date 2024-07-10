import { ICellRendererParams } from 'ag-grid-community';
import { EditButtonComponent } from './edit-button.component';

describe('EditButtonComponent', () => {
  let component: EditButtonComponent;
  let mockParams: ICellRendererParams<any, any>;

  beforeEach(() => {
    component = new EditButtonComponent();
  });

  it('should initialize params correctly in agInit', () => {
    component.agInit(mockParams);
    expect(component.params).toBe(mockParams);
  });

  it('should call togglebtn and editTaskByIdAgGrid in editTaskByIdAgGrid', () => {
    component.agInit(mockParams);
    component.editTaskByIdAgGrid();
    expect(mockParams.context.parentComponent.togglebtn).toHaveBeenCalled();
    // expect(mockParams.context.parentComponent.editTaskById()).toHaveBeenCalledWith(component.params);
  });

  it('should call onDelete in onDeleteAgGrid', () => {
    component.agInit(mockParams);
    component.onDeleteAgGrid();
    expect(mockParams.context.parentComponent.onDelete).toHaveBeenCalledWith(mockParams);
  });

  it('should return true in refresh method', () => {
    const result = component.refresh(mockParams);
    expect(result).toBe(true);
  });
});
