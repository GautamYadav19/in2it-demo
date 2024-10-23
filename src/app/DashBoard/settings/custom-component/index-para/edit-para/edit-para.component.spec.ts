import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParaComponent } from './edit-para.component';

describe('EditParaComponent', () => {
  let component: EditParaComponent;
  let fixture: ComponentFixture<EditParaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
