import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInputNameComponent } from './table-input-name.component';

describe('TableInputNameComponent', () => {
  let component: TableInputNameComponent;
  let fixture: ComponentFixture<TableInputNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableInputNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInputNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
