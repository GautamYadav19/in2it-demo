import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalenderRoutingModule } from './calender-routing.module';
import { CalenderComponent } from './calender.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [CalenderComponent],
  imports: [CommonModule, CalenderRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class CalenderModule {}
