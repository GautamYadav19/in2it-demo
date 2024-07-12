import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsComponent } from './contacts.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from 'src/app/Shared/icons/icons.module';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let formBuilder: FormBuilder;
  let router: Router;
  let DummyCommonData: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      imports: [RouterTestingModule, SharedModule, IconsModule, NgbNavModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);
    DummyCommonData = [
      {
        id: 1,
        organization: 'gautamORG',
        contact: [{ id: 1, role: 'Developer' }],
      },
      { id: 2, organization: 'testORG', contact: [{ id: 2, role: 'test' }] },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call initNewForm()', () => {
    component.orgForm = formBuilder.group({
      id: [''],
      name: formBuilder.group({
        fname: [''],
        lname: [''],
      }),
      org: [''],
      email: [''],
      number: formBuilder.group({
        code: [''],
        phoneNumber: [''],
      }),

      role: [''],
      additionalrole: [''],
      addmorefield: formBuilder.array([]),
      remark: [''],
    });
    component.initNewFrom();
    expect(component.orgForm).toBe(component.orgForm);
  });

  it('should return FormArray instance', () => {
    spyOn(component, 'getTableList');
    spyOn(component, 'initNewFrom');
    spyOn(component, 'getAllOrgdropdown');

    component.ngOnInit();
  });

  it('should filter data correctly', () => {
    // Setup initial state
    component.flagForOrgDropdown = false;
    const filtername = 'gautam';
    component.orgDropdown = filtername;
    const dataList = [
      { id: 1, organization: 'gautam', contact: [{ orgId: 1, organization: 'test' }] },
      { id: 2, organization: 'yash', contact: [{ orgId: 2, organization: 'test 2' }] },
    ];
    component.tableData = dataList;

    // Call the method under test
    component.filterData(filtername);

    // Assertions
    expect(component.flagForOrgDropdown).toBeTrue();
    expect(component.orgDropdown).toEqual(filtername);
    expect(component.showtableData).toEqual([
      { id: 1, organization: 'gautam', contact: [{ orgId: 1, organization: 'test' }] }
    ]);

  
  });

  it('should correctly call getOrgMemberDataById()', () => {
    // Set up test data
    component.showtableData = [
      {
        id: 1,
        organization: 'Organization B',
        contact: [
          {
            id: 1,
            name: 'Emily Johnson',
            role: 'Project Manager',
            email: 'emily.johnson@example.com',
            phoneNumber: '(456) 789-0123',
            additionalrole: 'No Additional role',
          },
          {
            id: 2,
            name: 'Michael Lee',
            role: 'Data Analyst',
            email: 'michael.lee@example.com',
            phoneNumber: '(789) 012-3456',
            additionalrole: 'No Additional role',
          },
        ],
      },
    ];

    const orgId = 1;
    const contactId = 1;

    // Call the method
    component.getOrgMemberDataById(orgId, contactId);

    // Assertions
    expect(component.orgNameForPatch).toEqual('Organization B');
    expect(component.toggle).toBeTrue();
    expect(component.openFormToggle).toBeFalse();
    expect(component.rightCardData).toEqual({
      id: 1,
      name: 'Emily Johnson',
      role: 'Project Manager',
      email: 'emily.johnson@example.com',
      phoneNumber: '(456) 789-0123',
      additionalrole: 'No Additional role',
    });
  });

  it('should be call navigateToOrganization()', () => {
    spyOn(router, 'navigateByUrl').and.stub();
    component.showtableData = DummyCommonData;
    component.navigateToOrganization({
      orgId: 1,
      organization: 'gautamORG',
      contact: [{ id: 1 }],
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/organization', {
      state: {
        data: {
          id: 1,
          organization: 'gautamORG',
          contact: [{ id: 1, role: 'Developer' }],
        },
        id: 1,
      },
    });
  });

  it('should be call getAllOrgdropdown()', () => {
    component.tableData = DummyCommonData;
    component.getAllOrgdropdown();
  });

  it('Should be call getRoles() when restricted role is not in list', () => {
    const testData = {
      id: 2,
      organization: 'Organization B',
      type: 'Non-Customer',
      industry: 'Industry B',
      onboarding: 'Onboarding B',
      relatedOrgs: 'Related Orgs B',
      products: 'Products B',
      orgSPOC: 'Org SPOC B',
      email: 'email2@example.com',
      phone: '987-654-3210',
      contact: [
        {
          id: 1,
          name: 'Emily Johnson',
          role: 'Project Manager',
          email: 'emily.johnson@example.com',
          phoneNumber: '(456) 789-0123',
          additionalrole: 'No Additional role',
        },
        {
          id: 2,
          name: 'Michael Lee',
          role: 'Data Analyst',
          email: 'michael.lee@example.com',
          phoneNumber: '(789) 012-3456',
          additionalrole: 'No Additional role',
        },
      ],
    };
    component.tableData = [testData];
    const orgName = { value: 'Organization B' };
    component.getRoles(orgName);
    const test = component.tableData.filter((data: any) => {
      return data.organization === orgName.value;
    });
  });

  it('Should be call getRoles()  when restricted role is  in the list', () => {
    const testData = {
      id: 2,
      organization: 'Organization B',
      type: 'Non-Customer',
      industry: 'Industry B',
      onboarding: 'Onboarding B',
      relatedOrgs: 'Related Orgs B',
      products: 'Products B',
      orgSPOC: 'Org SPOC B',
      email: 'email2@example.com',
      phone: '987-654-3210',
      contact: [
        {
          id: 1,
          name: 'Emily Johnson',
          role: 'Developer',
          email: 'emily.johnson@example.com',
          phoneNumber: '(456) 789-0123',
          additionalrole: 'No Additional role',
        },
        {
          id: 2,
          name: 'Michael Lee',
          role: 'Data Analyst',
          email: 'michael.lee@example.com',
          phoneNumber: '(789) 012-3456',
          additionalrole: 'No Additional role',
        },
      ],
    };
    component.tableData = [testData];
    const orgName = { value: 'Organization B' };
    component.getRoles(orgName);
    const test = component.tableData.filter((data: any) => {
      return data.organization === orgName.value;
    });
  });

  it('should be call newForm()', () => {
    spyOn(component, 'togglebtn');
    component.orgForm = formBuilder.group({
      name: ['Initial Name'],
      email: ['initial@example.com'],
    });
    component.newForm();
    component.orgForm.reset();
    expect(component.orgForm.get('name')?.value).toBeNull();
    expect(component.orgForm.get('email')?.value).toBeNull();
  });

  it('call getTableList() ', () => {
    component.getTableList();
  });

  it('call initEditForm() ', () => {
    expect(component.orgForm).toBeUndefined();
    component.orgForm = formBuilder.group({
      name: [''],
      email: [''],
    });
    component.initEditForm();
    // component.orgForm.patchValue({
    //   name:'test',email:'test@gmail.com'
    // })
    component.orgForm.patchValue({
      name: 'test',
      email: 'test@gmail.com',
    });
    expect(component.orgForm).toEqual(component.orgForm);
  });
  it('call onSubmit() when we are in submit mode', () => {
    component.editMode = false;
    component.orgForm = formBuilder.group({
      id: [''],
      name: formBuilder.group({
        fname: [''],
        lname: [''],
      }),
      org: ['Organization B'],
      email: [''],
      number: formBuilder.group({
        code: [''],
        phoneNumber: [''],
      }),

      role: [''],
      additionalrole: [''],
      addmorefield: formBuilder.array([]),
      remark: [''],
    });
    const testData = {
      id: 2,
      organization: 'Organization B',
      type: 'Non-Customer',
      industry: 'Industry B',
      onboarding: 'Onboarding B',
      relatedOrgs: 'Related Orgs B',
      products: 'Products B',
      orgSPOC: 'Org SPOC B',
      email: 'email2@example.com',
      phone: '987-654-3210',
      contact: [
        {
          id: 1,
          name: 'Emily Johnson',
          role: 'Project Manager',
          email: 'emily.johnson@example.com',
          phoneNumber: '(456) 789-0123',
          additionalrole: 'No Additional role',
        },
        {
          id: 2,
          name: 'Michael Lee',
          role: 'Data Analyst',
          email: 'michael.lee@example.com',
          phoneNumber: '(789) 012-3456',
          additionalrole: 'No Additional role',
        },
      ],
    };
    component.showtableData = [testData];
    component.onSubmit();
  });

  it('call onSubmit() when we are in edit mode', () => {
    component.editMode = true;
    component.orgForm = formBuilder.group({
      id: [''],
      name: formBuilder.group({
        fname: [''],
        lname: [''],
      }),
      org: ['Organization B'],
      email: [''],
      number: formBuilder.group({
        code: [''],
        phoneNumber: [''],
      }),

      role: [''],
      additionalrole: [''],
      addmorefield: formBuilder.array([]),
      remark: [''],
    });
    const testData = {
      id: 2,
      organization: 'Organization B',
      type: 'Non-Customer',
      industry: 'Industry B',
      onboarding: 'Onboarding B',
      relatedOrgs: 'Related Orgs B',
      products: 'Products B',
      orgSPOC: 'Org SPOC B',
      email: 'email2@example.com',
      phone: '987-654-3210',
      contact: [
        {
          id: 1,
          name: 'Emily Johnson',
          role: 'Project Manager',
          email: 'emily.johnson@example.com',
          phoneNumber: '(456) 789-0123',
          additionalrole: 'No Additional role',
        },
        {
          id: 2,
          name: 'Michael Lee',
          role: 'Data Analyst',
          email: 'michael.lee@example.com',
          phoneNumber: '(789) 012-3456',
          additionalrole: 'No Additional role',
        },
      ],
    };
    component.showtableData = [testData];
    component.onSubmit();
  });

  it('should be call togglebtn()', () => {
    expect(component.toggle).toBeFalse();
    component.togglebtn();
    expect(component.toggle).toBeTrue();
  });

  it('should be call cancel()', () => {
    component.orgForm = formBuilder.group({
      name: [],
      email: [],
    });
    component.storeSelectedData = [];
    component.cancel();

    expect(component.orgForm.get('name')?.value).toBeNull();
    expect(component.orgForm.get('email')?.value).toBeNull();
    expect(component.storeSelectedData.length).toEqual(0);
    expect(component.checkBoxDisableBtn).toBeTrue();
    // not requied
  });
  it('should be call clear()', () => {
    component.orgForm = formBuilder.group({
      name: [],
      email: [],
    });
    component.clear();
    expect(component.orgForm.get('name')?.value).toBeNull();
    expect(component.orgForm.get('email')?.value).toBeNull();
  });

  it('should be call openFormToggleFn() when pass args', () => {
    component.openFormToggleFn(false);
    expect(component.toggle).toBeTrue();
  });

  it('should be call openFormToggleFn() when not pass args', () => {
    component.openFormToggleFn();
    expect(component.toggle).toBeTrue();
  });

  // it("should be call openFormToggleFn() when pass args with else part pass true",()=>{
  //   component.rightCardData = formBuilder.group({
  //     id: [''],
  //     name: formBuilder.group({
  //       fname: [''],
  //       lname: [''],
  //     }),
  //     org: ['Organization B'],
  //     email: [''],
  //     number: formBuilder.group({
  //       code: [''],
  //       phoneNumber: [''],
  //     }),

  //     role: [''],
  //     additionalrole: [''],
  //     addmorefield: formBuilder.array([]),
  //     remark: [''],
  //   });
  //   spyOn(component,'initEditForm').and.callThrough()
  //   component.openFormToggleFn(true)
  //   expect(component.toggle).toBeTrue()

  //   expect(component.initEditForm).toHaveBeenCalled()
  // })

  it('should be call deleteMultipleData()', () => {
    const testData = {
      id: 1,
      organization: 'Organization A',
      type: 'Customer',
      industry: 'Industry A',
      onboarding: 'Onboarding A',
      relatedOrgs: 'Related Orgs A',
      products: 'Products A',
      orgSPOC: 'Org SPOC A',
      email: 'gautam@example.com',
      phone: '123-456-7890',
      contact: [
        {
          id: 1,
          name: 'Jane Smith',
          role: 'Designer',
          email: 'jane.smith@example.com',
          phoneNumber: '+27 654-3210',
          additionalrole: 'No Additional role',
        },
      ],
    };
    const storeSelectedData = {
      orgId: 1,
      contact: [
        {
          id: 1,
          name: 'Jane Smith',
          role: 'Designer',
          email: 'jane.smith@example.com',
          phoneNumber: '+27 654-3210',
          additionalrole: 'No Additional role',
        },
      ],
      contactIdForEdit: 1,
    };
    component.showtableData = [testData];
    component.storeSelectedData = [storeSelectedData];
    component.deleteMultipleData();
    expect(component.storeSelectedData).toEqual([]);
    expect(component.checkBoxDisableBtn).toBeTrue();
  });

  it('should be call editSelectedData()', () => {
    component.orgForm = formBuilder.group({
      name: [],
      email: [],
    });
    const testData = {
      id: 1,
      organization: 'Organization A',
      type: 'Customer',
      industry: 'Industry A',
      onboarding: 'Onboarding A',
      relatedOrgs: 'Related Orgs A',
      products: 'Products A',
      orgSPOC: 'Org SPOC A',
      email: 'gautam@example.com',
      phone: '123-456-7890',
      contact: [
        {
          id: 1,
          name: 'Jane Smith',
          role: 'Designer',
          email: 'jane.smith@example.com',
          phoneNumber: '+27 654-3210',
          additionalrole: 'No Additional role',
        },
      ],
    };
    component.showtableData = [testData];
    expect(component.checkBoxDisableBtn).toBeTrue();
    spyOn(component, 'getOrgMemberDataById').and.callThrough();

    component.storeSelectedData = [{ orgId: 1, contactIdForEdit: 1 }];
    component.checkBoxDisableBtn = false;
    component.editSelectedData();
    component.storeSelectedData = [];
    expect(component.storeSelectedData).toEqual([]);
  });

  it("should be call search()",()=>{
   const testData = {
      id: 1,
      organization: 'Organization A',
      type: 'Customer',
      industry: 'Industry A',
      onboarding: 'Onboarding A',
      relatedOrgs: 'Related Orgs A',
      products: 'Products A',
      orgSPOC: 'Org SPOC A',
      email: 'gautam@example.com',
      phone: '123-456-7890',
      contact: [
        {
          id: 1,
          name: 'Jane Smith',
          role: 'Designer',
          email: 'jane.smith@example.com',
          phoneNumber: '+27 654-3210',
          additionalrole: 'No Additional role',
        },
      ],
    };
    component.showtableData = [testData];
    component.search('Jane');
  })
});
