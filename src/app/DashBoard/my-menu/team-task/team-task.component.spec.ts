import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTaskComponent } from './team-task.component';

describe('TeamTaskComponent', () => {
  let component: TeamTaskComponent;
  let fixture: ComponentFixture<TeamTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
