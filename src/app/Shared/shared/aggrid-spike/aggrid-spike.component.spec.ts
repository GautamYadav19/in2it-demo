import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridSpikeComponent } from './aggrid-spike.component';

describe('AggridSpikeComponent', () => {
  let component: AggridSpikeComponent;
  let fixture: ComponentFixture<AggridSpikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggridSpikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggridSpikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
