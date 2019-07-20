import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventGroupsPage } from './event-groups.page';

const routes: Routes = [
  {
    path: '',
    component: EventGroupsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [],
  declarations: [EventGroupsPage, ]
})
export class EventGroupsPageModule { }
