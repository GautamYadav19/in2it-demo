import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaCustomComponent } from './para-custom.component';

describe('ParaCustomComponent', () => {
  let component: ParaCustomComponent;
  let fixture: ComponentFixture<ParaCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParaCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParaCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
