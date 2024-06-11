import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrgService {
  constructor() {}
  public orgID = new BehaviorSubject<number>(0);
  getOrgIdSub =this.orgID.asObservable()
  SetOrgId(id: number) {
    this.orgID.next(id);
  }
  deleteOrg(id: any) {
    const existingData = JSON.parse(localStorage.getItem('orgData')!) || [];
    existingData.splice(id, 1);
    localStorage.setItem('orgData', JSON.stringify(existingData));
  }
  getOrgByID(id: any) {
    const orgData = JSON.parse(localStorage.getItem('orgData')!) || [];
    for (let i = 0; i <= orgData.length; i++) {
      if (orgData[i]?.id === id) {
        return orgData[i];
      }
    }
  }
  getAllList(){
    let organizations = [
      {
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
        contact:[
          {
            id: 1,
            name: 'Jane Smith',
            role: 'Designer',
            email: 'jane.smith@example.com',
            phoneNumber: '+27 654-3210',
            additionalrole: "No Additional role"
          },
          {
            id: 2,
            name: 'John Doe',
            role: 'Developer',
            email: 'john.doe@example.com',
            phoneNumber: '+91 456-7890',
            additionalrole: "No Additional role"
          },
       
         
        ]
      },
      {
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
        contact:[
          {
            id: 1,
            name: 'Emily Johnson',
            role: 'Project Manager',
            email: 'emily.johnson@example.com',
            phoneNumber: '(456) 789-0123',
            additionalrole: "No Additional role"
          },
          {
            id: 2,
            name: 'Michael Lee',
            role: 'Data Analyst',
            email: 'michael.lee@example.com',
            phoneNumber: '(789) 012-3456',
            additionalrole: "No Additional role"
          },
         
        ]
      },
      {
        id: 3,
        organization: 'Organization C',
        type: 'Customer',
        industry: 'Industry C',
        onboarding: 'Onboarding C',
        relatedOrgs: 'Related Orgs C',
        products: 'Products C',
        orgSPOC: 'Org SPOC C',
        email: 'email3@example.com',
        phone: '456-789-0123',
        contact:[
          {
            id: 1,
            name: 'Sarah Brown',
            role: 'Marketing Specialist',
            email: 'sarah.brown@example.com',
            phoneNumber: '(321) 654-9870',
            additionalrole: "No Additional role"
          },
          {
            id: 2,
            name: 'Alex Turner',
            role: 'Sales Manager',
            email: 'alex.turner@example.com',
            phoneNumber: '(135) 246-8013',
            additionalrole: "No Additional role"
          }
        ]
      },
      {
        id: 4,
        organization: 'Organization D',
        type: 'Non-Customer',
        industry: 'Industry D',
        onboarding: 'Onboarding D',
        relatedOrgs: 'Related Orgs D',
        products: 'Products D',
        orgSPOC: 'Org SPOC D',
        email: 'email4@example.com',
        phone: '789-012-3456',
        contact:[
          {
            id: 1,
            name: 'x Brown',
            role: 'Marketing Specialist',
            email: 'sarah.brown@example.com',
            phoneNumber: '(321) 654-9870',
            additionalrole: "No Additional role"
          },
          {
            id: 2,
            name: 'q Turner',
            role: 'Sales Manager',
            email: 'alex.turner@example.com',
            phoneNumber: '(135) 246-8013',
            additionalrole: "No Additional role"
          }
        ]
      },
      {
        id: 5,
        organization: 'Organization R',
        type: 'Customer',
        industry: 'Industry A',
        onboarding: 'Onboarding A',
        relatedOrgs: 'Related Orgs A',
        products: 'Products A',
        orgSPOC: 'Org SPOC A',
        email: 'gautam@example.com',
        phone: '+27 123-456-7890',
        contact:[
          {
            id: 1,
            name: 'Jane Smith',
            role: 'Designer',
            email: 'jane.smith@example.com',
            phoneNumber: '+27 654-3210',
            additionalrole: "No Additional role"
          },
          {
            id: 2,
            name: 'John Doe',
            role: 'Developer',
            email: 'john.doe@example.com',
            phoneNumber: '+91 456-7890',
            additionalrole: "No Additional role"
          },
         
        ]
      },
      
      
    ];
    return organizations
  }
 
}
