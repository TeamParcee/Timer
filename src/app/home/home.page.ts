import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { EventGroup } from '../event-group';
import { TimerService } from '../timer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private eventService: EventsService,
    private timeService: TimerService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activeEventGroup = (this.eventService.activeEventGroup) ? this.eventService.activeEventGroup : this.dummyEventGroup;
    this.time = this.timeService.currentTime;
}
  activeEventGroup;
  currentEvent;
  time;

  dummyEventGroup: EventGroup = {
    id: "1",
    title: "No Active Event Group",
    events: []
  }



  getCurrentEvent(){

  }
}
