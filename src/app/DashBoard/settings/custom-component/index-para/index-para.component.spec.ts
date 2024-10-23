import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexParaComponent } from './index-para.component';

describe('IndexParaComponent', () => {
  let component: IndexParaComponent;
  let fixture: ComponentFixture<IndexParaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexParaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexParaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
