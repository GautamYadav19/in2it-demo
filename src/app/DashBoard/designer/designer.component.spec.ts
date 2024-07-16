import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerComponent } from './designer.component';
import { IconsModule } from 'src/app/Shared/icons/icons.module';

describe('DesignerComponent', () => {
  let component: DesignerComponent;
  let fixture: ComponentFixture<DesignerComponent>;
  let mockRoot: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignerComponent],
      imports: [IconsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // component.root=mockRoot
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('addELement', () => {
    component.count = 0;
    component.addElement([1, 2, 3], [4, 5]);
  });
  it('backELment()', () => {
    component.count = 5;
    component.backElement([1, 2, 3], [4, 5, 6, 7, 9, 8]);
  });
  it("addand back ",()=>{
    component.add()
    component.back()
  })
  // it("barchart",()=>{
  //   const root:any ={
  //     data:'1',
  //     dispose:jasmine.createSpyObj('dispose',['dispose'])
  //   }
  //   component.root=root
  //   component.barchart()
  // })
});
