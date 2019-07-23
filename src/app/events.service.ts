import { Injectable } from '@angular/core';
import { Event } from './event';
import { EventGroup } from './event-group';
import { Storage } from '@ionic/storage';
import { EventList } from './event-list';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private ls: Storage,
    private timerService: TimerService,
  ) { }



  private event: EventGroup;
  activeEventGroup: EventGroup;
  activeEvent: Event;


  async createEventList() {
    let eventList: EventList = {
      eventsGroups: []
    };
    this.ls.set("eventList", eventList);
  }

  async deleteEventList() {
    this.ls.remove("eventList");
  }

  async getEventList() {
    return this.ls.get("eventList")
  }

  async addEventGroup(eventGroup: EventGroup) {
    new Promise(async (resolve) => {
      let eventList: EventList = await this.ls.get('eventList');
      eventList.eventsGroups.push(eventGroup);
      this.ls.set('eventList', eventList);
      return resolve()
    })
  }

  async deleteEventGroup(eventGroup: EventGroup) {
    new Promise(async (resolve) => {
      let eventList: EventList = await this.ls.get('eventList');
      let index = eventList.eventsGroups.findIndex(g => g.id === eventGroup.id)
      eventList.eventsGroups.splice(index, 1);
      this.ls.set('eventList', eventList);
      return resolve()
    })
  }

  async saveEventGroup(eventGroup: EventGroup) {
    new Promise(async (resolve) => {
      let eventList: EventList = await this.ls.get('eventList');
      let index = eventList.eventsGroups.findIndex(g => g.id === eventGroup.id);
      eventList.eventsGroups.splice(index, 1, eventGroup);
      this.ls.set('eventList', eventList);
      return resolve()
    })
  }

  async addEvent(event: Event, eventGroup: EventGroup) {
    new Promise(async (resolve) => {
      eventGroup.events.push(event);
      let eventList: EventList = await this.ls.get('eventList');
      eventList.eventsGroups.push(eventGroup);
      this.saveEventGroup(eventGroup).then(() => {
        return resolve();
      })

    })
  }
  async deleteEvent(event: Event, eventGroup: EventGroup) {
    new Promise(async (resolve) => {
      let index = eventGroup.events.findIndex(e => e.id === event.id);
      eventGroup.events.splice(index, 1);
      this.saveEventGroup(eventGroup).then(() => {
        return resolve()
      })

    })
  }

  async editEvent(event: Event, eventGroup: EventGroup) {
    new Promise(async (resolve) => {
      let index = eventGroup.events.findIndex(e => e.id === event.id);
      eventGroup.events.splice(index, 1, event);
      this.saveEventGroup(eventGroup).then(() => {
        return resolve()
      })

    })
  }

  getEventGroups() {

    // return new Observable((ob)=>{
    //   return ob.next()
    // })



    return new Observable((ob) => {
      this.ls.get('eventList').then((eventList) => {
        if (!eventList) {
          this.checkEventList();
        }
        return ob.next(eventList)
      })
    })

  }

  async getEventGroup(id: string) {
    return new Promise(async (resolve) => {
      let eventList: EventList = await this.ls.get('eventList');
      let eventGroup = eventList.eventsGroups.find(g => g.id === id);
      return resolve(eventGroup);
    })
  }

  async checkEventList() {
    let eventList: EventList = await this.ls.get('eventList');
    if (!eventList) {
      this.createEventList();
    }
  }


  async startEvent(eventGroup: EventGroup) {
    this.activeEventGroup = eventGroup;
    let sortedEvents = eventGroup.events.sort((a, b) => (a.order > b.order) ? 1 : -1)
    let previousIndex;
    let previousEvent;
    let previousDuration;
    let timeoutTime = 0;
    sortedEvents.forEach(async (event) => {
      
      let index = this.activeEventGroup.events.findIndex(e => e.id === event.id);
      previousIndex = (index == 0) ? 0 : index - 1;
      previousEvent =  this.activeEventGroup.events[previousIndex];
      previousDuration  = (index == 0) ? 0 :  this.activeEventGroup.events[previousIndex].duration;

      timeoutTime = timeoutTime + previousDuration;
     
      setTimeout(()=>{
        console.log(event);
        this.activeEvent = event;
        console.log(this.activeEvent);
        this.timerService.startCountDownTimer(event);
      }, timeoutTime * 62000)
      

    })
  }
}
