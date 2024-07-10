import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { DataService } from 'src/app/DashBoard/my-menu/service/data.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service: DataService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [DataService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call ngOnInit()', () => {
    spyOn(component, 'getTabTitle');
    component.ngOnInit();
    expect(component.getTabTitle).toHaveBeenCalled();
  });
  it('should be call toggle()', () => {
    expect(component.flag).toBe(true);

    component.toggle();

    expect(component.flag).toBe(false);
  });
  it('should be call setTableTitle()', () => {
    const testData = {
      name: 'test name',
      modalName: 'test modal name',
    };

    component.setTableTitle(testData);
    // service.setTabnavigateName(testData);
  });
  it('should be call getTabTitle()', () => {
    const testData = {
      name: 'test name',
      modalName: 'test modal name',
    };
    // spyOn(service.tabNavigateName, 'subscribe')
    component.getTabTitle();
    // CC

  });
});
