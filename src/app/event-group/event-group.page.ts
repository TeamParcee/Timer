import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../component.service';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { Event } from '../event';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../events.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-event-group',
  templateUrl: './event-group.page.html',
  styleUrls: ['./event-group.page.scss'],
})
export class EventGroupPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private componentService: ComponentService,
    private eventService: EventsService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  eventGroup;


  ionViewWillEnter() {
    this.getEventGroup();
  }

  getEventGroup() {
    this.route.paramMap.subscribe(async (paramMap) => {
      let id = paramMap.get('id');
      console.log(id, "id");
      this.eventGroup = await this.eventService.getEventGroup(id);
      console.log(this.eventGroup, "eventGroup");
    })
  }

  deleteEventGroup() {
    this.componentService.confirmationAlert("Delete Event Group", "Are you sure you want to delete this event group?", { denyText: "Cancel", confirmText: "Delete Event Group" })
      .then((result) => {
        if (result) {
          this.eventService.deleteEventGroup(this.eventGroup).then(() => {
            this.navCtrl.navigateBack("/home")
          })
        }
      })
  }


  addEvent() {
    this.componentService.showModal(AddEventComponent, { eventGroup: this.eventGroup });
  }

  editEvent(event: Event) {
    this.componentService.showModal(EditEventComponent, { event: event, eventGroup: this.eventGroup })
  }


}
