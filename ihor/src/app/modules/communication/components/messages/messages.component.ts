import { Component } from '@angular/core';
import { MessageService, Message, ChatType, Chat} from 'src/app/modules/communication/services/message/message.service'
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  public chats: Chat[];
  public chatType=ChatType;

  constructor(private messageService: MessageService){
  
    this.chats=[ //prebaciti u servis i pretplatiti se
      {
          image: "", //TODO
          name: "Ivan Mrsulja SUPPORT",
          messages: [message1,message2,message3],
          type: ChatType.SUPPORT
      },
      {
          image: "",
          name: "Stevan Gostojic",
          messages: [message4,message5],
          type: ChatType.PANIC
      },
    ];
  }
  redirectTo(chat:Chat)
  {
    this.messageService.openChat(chat);
  }
}

const date1=new Date('2022-12-16T10:24:00'); //prebaciti u servis
const date2=new Date('2022-12-17T03:24:00');
const date3=new Date('2022-12-18T02:24:00');
const date4=new Date('2022-12-17T06:24:00');
const date5=new Date('2022-12-19T10:24:00');
const message1: Message={ timestamp: date1.getHours()+':'+date1.getMinutes(), content: 'Samo jako', myself: false}
const message2: Message={ timestamp: date2.getHours()+':'+date2.getMinutes(), content: 'BORJAN', myself: true}
const message3: Message={ timestamp: date3.getHours()+':'+date3.getMinutes(), content: 'BORJAN', myself: false}
const message4: Message={ timestamp: date4.getHours()+':'+date4.getMinutes(), content: 'Dobar' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'dan', myself: false}
const message5: Message={ timestamp: date5.getHours()+':'+date5.getMinutes(), content: 'PROFESORE', myself: false}
