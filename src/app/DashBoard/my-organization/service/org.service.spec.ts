import { TestBed } from '@angular/core/testing';

import { OrgService } from './org.service';

describe('OrgService', () => {
  let service: OrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be init SetOrgId()', () => {
    const instance = new OrgService();
    const data = { id: 1 };
    instance.SetOrgId(data.id);
    instance.orgID.subscribe((result) => {
      expect(result).toEqual(data.id);
    });
  });
  it('should be call getAllData() Fn', () => {
    const instance = new OrgService();
    instance.getAllList();
  });
  it('delete()', () => {
    // arrange
    const instance = new OrgService();
    const testData = [
      { id: 1, org: 'test 1' },
      { id: 2, test: 'test 2' },
    ];

    localStorage.setItem('orgData', JSON.stringify(testData));
    // act
    instance.deleteOrg(1);
    // assert
    const updatedData = JSON.parse(localStorage.getItem('orgData')!);
    expect(updatedData.length).toBe(1);
    expect(updatedData.find((org:any) => org.id === 2)).toBeUndefined();
  });
  it('delete()', () => {
    // arrange
    const instance = new OrgService();
    const testData = [
      { id: 1, org: 'test 1' },
      { id: 2, test: 'test 2' },
    ];

    localStorage.setItem('orgData', JSON.stringify(testData));
    // act
    instance.getOrgByID(1);
    // assert
    const existingDataData = JSON.parse(localStorage.getItem('orgData')!);
    expect(existingDataData.length).toBe(2);
    expect(existingDataData.find((org:any) => org.id === 2)).toEqual({ id: 2, test: 'test 2' });
  });
});
