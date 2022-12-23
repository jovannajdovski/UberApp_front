import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { ChatComponent } from './components/chat/chat.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ChatComponent,
    InboxComponent,
    MessagesComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class CommunicationModule { }
