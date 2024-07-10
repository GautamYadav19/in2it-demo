import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { OrgDetailsComponent } from './org-details.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { OrgService } from '../service/org.service';

describe('OrgDetailsComponent', () => {
  let component: OrgDetailsComponent;
  let fixture: ComponentFixture<OrgDetailsComponent>;
  let service: OrgService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgDetailsComponent],
      imports: [NgbNavModule],
      providers: [DatePipe, OrgService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(OrgService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    spyOn(component, 'getOrgByID');
    spyOn(component, 'getContactData');

    component.ngOnInit();

    component.getOrgByID()

  });

  it('should call togglebtn()', () => {
    expect(component.addTaskFlag).toBeFalse();
    component.togglebtn();
    expect(component.addTaskFlag).toBeTrue();
  });

  it('should call getContactData()', () => {
    component.getContactData();

  });
  it('should call getOrgMemberDataById()', () => {
    const testData = [{ id: 1 }, { id: 2 }, { id: 3 }]; // Sample test data
    const id = 1;

    // Assuming this.tableData is set properly in the component setup or mock
    component.tableData = testData;

    spyOn(component, 'togglebtn');

    component.getOrgMemberDataById(id);

    // Assert that togglebtn was called
    expect(component.togglebtn).toHaveBeenCalled();

    // Assert that rightCardData is set correctly
    expect(component.rightCardData).toEqual({ id: 1 });
  });

   it('should call getOrgByID()', () => {
   
  });
});
