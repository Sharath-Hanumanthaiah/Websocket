import { Component, OnInit } from '@angular/core';
import {  Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email="";
  password="";
  message = "";
  constructor( private router: Router) { }

  ngOnInit() {
    
  }

  logIn() {
    if (this.email == 'hsharath1@gmail.com' && this.password == '123456') {
      this.router.navigate(['/message']);
      localStorage.setItem("loginPerson", 'Sharath');
      localStorage.setItem("sendMessage", 'Karthik');
    } else if(this.email == 'karthikhanumanthaiah@gmail.com' && this.password == '123456'){
      this.router.navigate(['/message']);
      localStorage.setItem("loginPerson", 'Karthik');
      localStorage.setItem("sendMessage", 'Sharath');
    } else {
      this.message="Invalid User Name and Password"
    }
  }

}
