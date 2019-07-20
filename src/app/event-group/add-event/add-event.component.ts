import { Component, OnInit } from '@angular/core';
import { EventGroup } from 'src/app/event-group';
import { ComponentService } from 'src/app/component.service';
import { EventsService } from 'src/app/events.service';
import { Event } from 'src/app/event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {

  constructor(
    private componentService: ComponentService,
    private eventService: EventsService,
  ) { }

  ngOnInit() {}


  title: string;
  duration: number;
  order: number;
  eventGroup;

  save(){
    let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    let event:Event = {
      order: this.order,
      id: id,
      title: this.title,
      duration: this.duration
    }
    event.id = id;
    this.componentService
    .confirmationAlert("Create Event", "Are you sure you to create this Event", {denyText: "Cancel", confirmText:"Create"})
    .then((result)=>{
      if(result){
        this.eventService.addEvent(event, this.eventGroup);
        this.componentService.showOkAlert("Event Created", "Your Event has been created!");
        this.componentService.closeModal();
      }
    })
  }

  close(){
    this.componentService.closeModal();
  }

}
