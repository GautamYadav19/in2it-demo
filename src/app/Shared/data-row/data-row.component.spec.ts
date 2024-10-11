import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRowComponent } from './data-row.component';

describe('DataRowComponent', () => {
  let component: DataRowComponent;
  let fixture: ComponentFixture<DataRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
