import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public sendMessage = new Subject<any>();
  sendMessage$ = this.sendMessage.asObservable();

  public resivedMessage = new Subject<any>();
  resivedMessage$ = this.resivedMessage.asObservable();
  
  constructor() { }
}
