import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { DataService } from 'src/app/DashBoard/my-menu/service/data.service';
import { IconsModule } from '../../icons/icons.module';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [DataService],
      imports: [IconsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call ngOnInit()', () => {
    spyOn(component, 'getTabTitle').and.callThrough();

    component.ngOnInit();

    expect(component.getTabTitle).toHaveBeenCalled();
    component.title = { name: 'test', modalName: 'test model' };

    dataService.tabNavigateName.subscribe((res) => {
      expect(component.title).toEqual(res);
    });
    dataService.setTabnavigateName({ name: 'test', modalName: 'test model' });
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
  });

  // it('should set title to undefined when DataService does not emit a value', () => {

  // dataService.setTabnavigateName({name:'test',modalName:'test model'})
  //   component.getTabTitle();
  //   fixture.detectChanges();
  //   dataService.tabNavigateName.subscribe((res)=>{
  //     console.log("res",res);

  //     expect(component.title).toEqual(res)
  //   })

  // });
});
