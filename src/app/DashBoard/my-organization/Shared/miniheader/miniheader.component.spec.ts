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
  let event: MouseEvent;

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
    fixture.detectChanges();
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

    localStorage.setItem('orgData', JSON.stringify(navTestData));

    spyOn(component, 'getListOfTable').and.callThrough();
    spyOn(component, 'getAllTable').and.callThrough();
    console.log(component.navs);
    expect(component.getListOfTable).toHaveBeenCalledTimes(0);
    expect(component.getAllTable).toHaveBeenCalledTimes(0);
  });

  it('should create', () => {
    // const navTestData = [
    //   {
    //     id: 0,
    //     organization: 'Organization',
    //     email: '',
    //     industry: '',
    //     onboarding: '',
    //     orgSPOC: '',
    //     phone: '',
    //     products: '',
    //     relatedOrgs: '',
    //     type: '',
    //   },
    //   {
    //     id: 1,
    //     organization: 'Organization 1',
    //     email: '',
    //     industry: '',
    //     onboarding: '',
    //     orgSPOC: '',
    //     phone: '',
    //     products: '',
    //     relatedOrgs: '',
    //     type: '',
    //   },
    // ];

    // localStorage.setItem('orgData', JSON.stringify(navTestData));
    // // const existingData = JSON.parse(localStorage.getItem('orgData')!);
    // const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    // const spyPreventDefault = spyOn(event, 'preventDefault').and.callThrough();

    // component.close(event, 0, 1);

    // expect(component.navs).toEqual(navTestData);
    // expect(component.active).toEqual(0);

    // expect(spyPreventDefault).toHaveBeenCalled();
    // expect(event.defaultPrevented).toBeTrue();

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([{ id: 1 }, { id: 2 }])
    );
    spyOn(localStorage, 'setItem');
  });
 });
