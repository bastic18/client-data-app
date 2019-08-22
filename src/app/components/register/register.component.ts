import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "./../../services/authentication.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
password: string;
email: string;
  constructor( private authserv: AuthenticationService, private flmsg: FlashMessagesService, private router: Router) { }

  ngOnInit() {
  }


  Submitregisterform(){
this.authserv.register(this.email, this.password)
.then(res=> {
  this.flmsg.show("registered sucessully and logged in",{cssClass: 'alert-primary', timeout: 3000});
  this.router.navigate(['/']);
})
.catch(err=>{this.flmsg.show(err.message,{cssClass: 'alert-danger', timeout: 3000});
} );

  }


}
