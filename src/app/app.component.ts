import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SSEService } from './service/sse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'folder_structure_demo';
  constructor(private serviceSSE: SSEService) {}
  
  message!: string;
  private eventSubscription!: Subscription;
  ngOnInit(): void {
    this.eventSubscription = this.serviceSSE
    .getServerSentEvent('http://localhost:3000/api/events')
    .subscribe((event) => {
      this.message = event.data;
    });
  }
  ngOnDestroy(): void {
  this.eventSubscription.unsubscribe()
  }

}
