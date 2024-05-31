import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrgService } from '../../service/org.service';
import { DataService } from 'src/app/DashBoard/my-menu/service/data.service';

@Component({
  selector: 'app-miniheader',
  templateUrl: './miniheader.component.html',
  styleUrls: ['./miniheader.component.css'],
})
export class MiniheaderComponent implements OnInit, OnDestroy {
  // organizations = [
  //   {
  //     id: 1,
  //     organization: 'Organization A',
  //     type: 'Customer',
  //     industry: 'Industry A',
  //     onboarding: 'Onboarding A',
  //     relatedOrgs: 'Related Orgs A',
  //     products: 'Products A',
  //     orgSPOC: 'Org SPOC A',
  //     email: 'gautam@example.com',
  //     phone: '123-456-7890',
  //   },
  //   {
  //     id: 2,
  //     organization: 'Organization B',
  //     type: 'Non-Customer',
  //     industry: 'Industry B',
  //     onboarding: 'Onboarding B',
  //     relatedOrgs: 'Related Orgs B',
  //     products: 'Products B',
  //     orgSPOC: 'Org SPOC B',
  //     email: 'email2@example.com',
  //     phone: '987-654-3210',
  //   },
  //   {
  //     id: 3,
  //     organization: 'Organization C',
  //     type: 'Customer',
  //     industry: 'Industry C',
  //     onboarding: 'Onboarding C',
  //     relatedOrgs: 'Related Orgs C',
  //     products: 'Products C',
  //     orgSPOC: 'Org SPOC C',
  //     email: 'email3@example.com',
  //     phone: '456-789-0123',
  //   },
  //   {
  //     id: 4,
  //     organization: 'Organization D',
  //     type: 'Non-Customer',
  //     industry: 'Industry D',
  //     onboarding: 'Onboarding D',
  //     relatedOrgs: 'Related Orgs D',
  //     products: 'Products D',
  //     orgSPOC: 'Org SPOC D',
  //     email: 'email4@example.com',
  //     phone: '789-012-3456',
  //   },
  //   {
  //     id: 5,
  //     organization: 'Organization A',
  //     type: 'Customer',
  //     industry: 'Industry A',
  //     onboarding: 'Onboarding A',
  //     relatedOrgs: 'Related Orgs A',
  //     products: 'Products Asdfsd',
  //     orgSPOC: 'Org SPOC A',
  //     email: 'gautam@example.com',
  //     phone: '123-456-7890',
  //   },
  // ];
  navs = [
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
  organizations: any = [];
  counter = this.navs.length + 1;
  active!: number;
  showTable!: any;
  flag!: boolean;
  ngOnInit(): void {
    this.getListOfTable();
    this.getAllTable();
    const existingData = JSON.parse(localStorage.getItem('orgData')!);
    existingData?.forEach((element: any) => {
      this.navs.push(element);
    });

    const navigation = history.state;
    console.log("org",navigation?.data)
    if ( navigation.data && navigation.id) {
     

      this.add(navigation, navigation.data);
    }
  
  }

  constructor(
    private orgService: OrgService,
    private dataService: DataService
  ) {
    this.setnavTitle();
  }

  setnavTitle() {
    this.dataService.setTabnavigateName({
      name: 'details',
      modalName: 'Organization',
    });
  }
  ngOnDestroy(): void {
    localStorage.removeItem('orgData');
  }

  close(event: MouseEvent, toRemove: number, id: any) {
    this.navs.splice(toRemove, 1);
    this.active = 0;
    const existingData = JSON.parse(localStorage.getItem('orgData')!);
    const data = existingData.filter((data: any) => {
      return data.id !== id;
    });
    console.log('dsfsd', data);
    localStorage.setItem('orgData', JSON.stringify(data));
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  checkExisitingTab(id: number) {
    this.flag = false;
    this.navs.some((data) => {
      if (data.id === id) {
        this.flag = true;
        return true;
      }
      return false;
    });
  }
  onTabClick(id: any) {
    if (id !== 0) {
      this.active = id;
      this.orgService.SetOrgId(id);
    }
  }
  add(event: MouseEvent, org: any) {
    this.checkExisitingTab(org?.id);
    this.active = org.id;
    if (!this.flag) {
      this.navs.push(org);
      this.orgService.SetOrgId(org.id);
      const existingData = JSON.parse(localStorage.getItem('orgData')!) || [];
      existingData.push(org);
      localStorage.setItem('orgData', JSON.stringify(existingData));

      // event.preventDefault();
    } else {
      this.orgService.SetOrgId(org.id);
    }
  }

  filterData(filterName: any) {
    const filteredOrganizations = this.organizations.filter(
      (data: any) => data.type === filterName
    );
    this.showTable = filteredOrganizations;
  }
  getAllTable() {
    this.showTable = this.organizations;
  }
  getListOfTable() {
    this.organizations = this.orgService.getAllList();
    console.log(this.organizations, 'sdfsdfsd');
  }

  searOrgList(value: string) {
    if (!value) {
      this.showTable = this.organizations;
    } else {
      const filteredOrganizations = this.organizations.filter((org: any) => {
        const orgValues = Object.values(org);
        return orgValues.some(
          (field) =>
            typeof field === 'string' &&
            field.toLowerCase().includes(value.toLowerCase())
        );
      });
      this.showTable = filteredOrganizations;
    }
  }
}
