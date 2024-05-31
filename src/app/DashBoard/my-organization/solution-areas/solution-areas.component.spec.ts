import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionAreasComponent } from './solution-areas.component';

describe('SolutionAreasComponent', () => {
  let component: SolutionAreasComponent;
  let fixture: ComponentFixture<SolutionAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
