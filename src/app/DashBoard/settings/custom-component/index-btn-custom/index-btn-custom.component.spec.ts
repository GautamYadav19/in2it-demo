import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBtnCustomComponent } from './index-btn-custom.component';

describe('IndexBtnCustomComponent', () => {
  let component: IndexBtnCustomComponent;
  let fixture: ComponentFixture<IndexBtnCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBtnCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBtnCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
