import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  subscription: Subscription;
  public messageHistory: MessageHistory = new MessageHistory();
  messageHistoryArr = new Array<MessageHistory>();

  constructor(public appService: AppService) {
    
  }
  message;
  sendTextTo = localStorage.getItem("sendMessage");
  ngOnInit() {
    this.subscribeConnection();
  }

  messageTo(sendTo) {
    
    this.sendTextTo = sendTo;
  }

  SendMessage() {
    this.messageHistory = new MessageHistory();
    let data = {
      message: this.message,
      messageTo:this.sendTextTo
    }
    this.messageHistory.message = this.message;
    this.messageHistory.typeMessage = true;

    this.messageHistoryArr.push(this.messageHistory);
    this.appService.sendMessage.next(data);
  }

  subscribeConnection() {
    this.subscription = this.appService.resivedMessage$.subscribe(item => {
      this.receivedMessasge(item);
    }, error => {
      console.log("subscription error ", error);
    });
  }

  receivedMessasge(item) {
    this.messageHistory = new MessageHistory();
    this.messageHistory.message = item;
    this.messageHistory.typeMessage = false;
    this.messageHistoryArr.push(this.messageHistory);
  }
}


export class MessageHistory{
  message: String;
  typeMessage: Boolean;

  public constructor() {
    this.message = "";
    this.typeMessage = true;
  }
};
