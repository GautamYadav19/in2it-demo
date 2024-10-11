import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStoreTableComponent } from './data-store-table.component';

describe('DataStoreTableComponent', () => {
  let component: DataStoreTableComponent;
  let fixture: ComponentFixture<DataStoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataStoreTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
