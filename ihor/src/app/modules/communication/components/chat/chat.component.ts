import { Component } from '@angular/core';
import { MessageService, Message, MessageType, Chat, MessageRequest} from 'src/app/modules/communication/services/message/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public message='';
  public chatRideId=-1;
  public chat:Chat={image: '', name: '', messages: [], rideId:-1, receiverId:-1};
  public messageType=MessageType;
  constructor(private messageService: MessageService){
    this.messageService.observableChat$.subscribe((chat)=>
    {
      this.chat=chat; 
    });
    this.messageService.observableSelectedChatRideId$.subscribe((value)=>
    {
      this.chatRideId=value;
    })
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewChecked()
  {
    const scrollableContainer = document.getElementById("messages_container");
      if(scrollableContainer!=null)
      {
        scrollableContainer.scrollTo(0,scrollableContainer.scrollHeight);
      }
  }
  public sendMessage(messageType:MessageType)
  {
    const messageRequest:MessageRequest={
      "receiverId": this.chat.receiverId,
      "message": this.message,
      "type": messageType,
      "rideId": this.chat.rideId
    }
    this.messageService.sendMessage(messageRequest);

  }
  public fullDate(date:Date):string
  {
    return new Date(date).getHours().toString().padStart(2, "0")+":"+new Date(date).getMinutes().toString().padStart(2, "0")+" "
    +new Date(date).getDate().toString().padStart(2, "0")+"."+(new Date(date).getMonth()+1).toString().padStart(2,"0")+"."+new Date(date).getFullYear()+".";
  }
  public equalsPanic(message:Message): boolean{
    return message.type.toString()=="PANIC";
  }
}