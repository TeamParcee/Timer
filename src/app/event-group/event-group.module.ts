import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventGroupPage } from './event-group.page';

const routes: Routes = [
  {
    path: '',
    component: EventGroupPage
  },{
    path: ':id',
    component: EventGroupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventGroupPage]
})
export class EventGroupPageModule {}
