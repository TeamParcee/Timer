import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../component.service';
import { CreateEventGroupComponent } from './create-event-group/create-event-group.component';
import { EventsService } from '../events.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-event-groups',
  templateUrl: './event-groups.page.html',
  styleUrls: ['./event-groups.page.scss'],
})
export class EventGroupsPage implements OnInit {

  constructor(
    private componentService: ComponentService,
    private eventService: EventsService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) { }


  eventList;

  ngOnInit() {
  }

  async ionViewWillEnter() {

    this.route.paramMap.subscribe(async (paramMap) => {
      this.eventService.checkEventList();
      this.eventList = await this.eventService.getEventList();
    })

  }
  addEventGroup() {
    this.componentService.showModal(CreateEventGroupComponent, null)
  }

  activate(eventGroup) {
    this.eventService.startEvent(eventGroup);
    this.navCtrl.navigateBack("/home")
  }

}
