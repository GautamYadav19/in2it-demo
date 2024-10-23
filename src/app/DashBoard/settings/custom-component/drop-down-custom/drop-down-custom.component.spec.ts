import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownCustomComponent } from './drop-down-custom.component';

describe('DropDownCustomComponent', () => {
  let component: DropDownCustomComponent;
  let fixture: ComponentFixture<DropDownCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
