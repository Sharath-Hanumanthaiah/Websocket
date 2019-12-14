import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subscription, Subject } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  message: any;
  public sockjsUrl: any;
  public isWebsocketConnected: boolean = false;
  public stompClient = null;
  subscription: Subscription;
  
  constructor(public appService:AppService) {
    this.webSocketInitialize();
   }

  ngOnInit() {
    this.subscribeConnection();
  }

  webSocketInitialize() 
  {  
    // this.sockjsUrl = new SockJS("http://localhost:9090/trinityWebSocket/connectToSocket");
    this.sockjsUrl = new SockJS("http://localhost:8080/connectToSocket");
    this.stompClient = Stomp.over(this.sockjsUrl);
    this.stompClient.connect({}, () =>
     {
      this.isWebsocketConnected = true;
     //console.log("localStorage.getItem(company_name)",localStorage.getItem("company_name"));

      this.stompClient.subscribe("/notificationDetails/"+localStorage.getItem("loginPerson"), (response) =>
       {
         const bodyData: any = response.body;
         console.log("webSocket subscribe response -> ", bodyData);
        this.appService.resivedMessage.next(JSON.stringify(bodyData));
      }); 

     }, 
     (error) => 
     {
        this.isWebsocketConnected = false;
        this.webSocketInitialize();
     });

  }
  
  SendMessage(data) {
    this.stompClient.send(
      '/icccapp/pingMessage',
      {},
      JSON.stringify({ 'message': data})
    );
  } 

  
  subscribeConnection() {
    this.subscription = this.appService.sendMessage$.subscribe(item => {
      this.SendMessage(item);
    }, error => {
      console.log("subscription error ", error);
    });
}
}
