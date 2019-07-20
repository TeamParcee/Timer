import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/event';
import { ComponentService } from 'src/app/component.service';
import { EventsService } from 'src/app/events.service';
import { EventGroup } from 'src/app/event-group';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {

  constructor(
    private componentService: ComponentService,
    private eventService: EventsService
  ) { }

  ngOnInit() { }


  event: Event;
  eventGroup: EventGroup;

  save() {

    this.componentService
      .confirmationAlert("Save Event", "Are you sure you to save this Event", { denyText: "Cancel", confirmText: "Save" })
      .then((result) => {
        if (result) {
          this.eventService.editEvent(this.event, this.eventGroup);
          this.componentService.showOkAlert("Event Save", "Your Event has been save!");
        }
      })
  }

  deleteEvent() {
    this.componentService.confirmationAlert("Delete Event", "Are you sure you want to delete this Event?", { denyText: "Cancel", confirmText: "Delete Event" })
      .then((result) => {
        if (result) {
          this.eventService.deleteEvent(this.event, this.eventGroup).then(()=>{
            this.close();
          })
        }
      })
  }
  close() {
    this.componentService.closeModal();
  }

}
