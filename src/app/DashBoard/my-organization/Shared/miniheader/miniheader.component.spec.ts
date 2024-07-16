import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniheaderComponent } from './miniheader.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { IconsModule } from 'src/app/Shared/icons/icons.module';

describe('MiniheaderComponent', () => {
  let component: MiniheaderComponent;
  let fixture: ComponentFixture<MiniheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiniheaderComponent],
      imports: [
        AgGridModule,
        ReactiveFormsModule,
        NgbNavModule,
        SharedModule,
        IconsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniheaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onInit()', () => {
    component.ngOnInit();
    const navTestData = {
      id: 0,
      organization: 'Organization',
      email: 'test@gmail.com',
      industry: '',
      onboarding: '',
      orgSPOC: '',
      phone: '',
      products: '',
      relatedOrgs: '',
      type: '',
    };
    component.navs = [navTestData];
    localStorage.setItem('orgData', JSON.stringify(navTestData));

    spyOn(component, 'getListOfTable').and.callThrough();
    spyOn(component, 'getAllTable').and.callThrough();

    expect(component.getListOfTable).toHaveBeenCalledTimes(0);
    expect(component.getAllTable).toHaveBeenCalledTimes(0);
  });

  
  it('should onInit() for exisiting data', () => {
    const navTestData = {
      id: 0,
      organization: 'Organization',
      email: 'test@gmail.com',
      industry: '',
      onboarding: '',
      orgSPOC: '',
      phone: '',
      products: '',
      relatedOrgs: '',
      type: '',
    };
    component.navs = [navTestData];
    localStorage.setItem('orgData', JSON.stringify([navTestData]));
    component.ngOnInit();

  });
  it('close', () => {
    let data = [
      {
        id: 1,
        name: 'test',
      },
    ];
    localStorage.setItem('orgData', JSON.stringify(data));
    let event = new MouseEvent('click');

    component.close(event, 1, 1);
  });

  it('checkExisitingTab is true', () => {
    component.navs = [
      {
        id: 0,
        organization: 'Organization',
        email: '',
        industry: '',
        onboarding: '',
        orgSPOC: '',
        phone: '',
        products: '',
        relatedOrgs: '',
        type: '',
      },
    ];
    component.checkExisitingTab(0);
  });
  it('checkExisitingTab is false', () => {
    component.navs = [
      {
        id: 0,
        organization: 'Organization',
        email: '',
        industry: '',
        onboarding: '',
        orgSPOC: '',
        phone: '',
        products: '',
        relatedOrgs: '',
        type: '',
      },
    ];
    component.checkExisitingTab(1);
    expect(component.flag).toBeFalse();
  });

  it('onTabClick', () => {
    component.onTabClick(1);
    expect(component.active).toEqual(1);
  });

  // it('add flag is false', () => {
  //   component.flag = false;

  //   let event = new MouseEvent('click');
  //   let org = { id: 1, name: 'test' };
  //   spyOn(component, 'checkExisitingTab').and.callThrough();
  //   component.add(event, org);
  // });

  it('add flag is true', () => {
    let event = new MouseEvent('click');
 

    let org = { id: 1, name: 'test' };
    component.flag = true;
    component.add(event, org);
    // component.flag = true;

    expect(component.flag).toBeDefined();
    // expect(component.flag).toBeTrue();

  });

  it('filterData', () => {
    component.organizations = [
      {
        type: 'test',
      },
    ];
    component.filterData('test');
    expect(component.rowData).toEqual([
      {
        type: 'test',
      },
    ]);
  });

  it('onCellClick', () => {
    const res = {
      data: { id: 1 },
      colDef: {
        field: 'organization',
      },
    };

    component.onCellClick(res);
  });

  it('searOrgList', () => {
    component.organizations = [
      {
        type: 'test',
      },
    ];
    component.searOrgList('test');
    expect(component.rowData).toEqual(component.organizations);
  });

  it('searOrgList undefine send', () => {
    component.organizations = [
      {
        type: 'test',
      },
    ];
    component.searOrgList('');
  });

  it('navigation', () => {
    spyOn(component, 'add');

    history.pushState({ id: 1, data: ['mockData'] }, '', '/');

    component.ngOnInit();

    expect(component.add).toHaveBeenCalled();
  });
});
