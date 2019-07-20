import { Component, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/component.service';
import { EventsService } from 'src/app/events.service';
import { EventGroup } from 'src/app/event-group';

@Component({
  selector: 'app-create-event-group',
  templateUrl: './create-event-group.component.html',
  styleUrls: ['./create-event-group.component.scss'],
})
export class CreateEventGroupComponent implements OnInit {

  constructor(
    private componentService: ComponentService,
    private eventService: EventsService,
  ) { }

  ngOnInit() {}

  title;


  save(){
    let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let eventGroup:EventGroup = {
      id: id,
      title: this.title,
      events: [],
    }
    this.componentService
    .confirmationAlert("Create Event Group", "Are you sure you to create this Event Group", {denyText: "Cancel", confirmText:"Create"})
    .then((result)=>{
      if(result){
        this.eventService.addEventGroup(eventGroup);
        this.componentService.showOkAlert("Event Group Created", "Your Event Group has been created!");
        this.componentService.closeModal();
      }
    })
  }

  close(){
    this.componentService.closeModal();
  }
}
