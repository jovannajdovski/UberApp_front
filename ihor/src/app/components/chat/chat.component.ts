import { Component } from '@angular/core';
import { MessageService, Message, ChatType, Chat} from 'src/app/services/message/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
    public chatSelected=true;
    public chat= {
      image: "", //TODO
      name: "Ivan Mrsulja SUPPORT",
      messages: [message1,message2,message3],
      type: ChatType.PANIC
    }
    public chatType=ChatType;

    constructor(private messageService: MessageService){}
}

const date1=new Date('2022-12-16T10:24:00');
const date2=new Date('2022-12-17T03:24:00');
const date3=new Date('2022-12-18T02:24:00');
const message1: Message={ timestamp: date1.getHours()+':'+date1.getMinutes(), content: 'Samo jako Samo jako Samo jakoSamo jakoSamo jakoSamo jakoSamo jakoSamo jakoSamo jakoSamo jakoSamo jakoSamo jakoSamo jakoSamo jakoSamo jako', myself: false}
const message2: Message={ timestamp: date2.getHours()+':'+date2.getMinutes(), content: 'BORJAN', myself: true}
const message3: Message={ timestamp: date3.getHours()+':'+date3.getMinutes(), content: 'BORJAN', myself: false}
