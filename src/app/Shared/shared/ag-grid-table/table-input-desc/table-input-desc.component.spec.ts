import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInputDescComponent } from './table-input-desc.component';

describe('TableInputDescComponent', () => {
  let component: TableInputDescComponent;
  let fixture: ComponentFixture<TableInputDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableInputDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInputDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
