import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "./../../services/authentication.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string;
email: string;
  constructor( private authserv: AuthenticationService, private flmsg: FlashMessagesService, private router: Router ) { }

  ngOnInit() {
    this.authserv.getAuth().subscribe(auth=> {
      if(auth){
this.router.navigate(['/']);
      }
    });
  }
  Submitloggingform(){
this.authserv.login(this.email,this.password)
.then(res=> {
  this.flmsg.show("You have successfully logged in",{cssClass: 'alert-primary', timeout: 3000});
  this.router.navigate(['/']);
})
.catch(err=>{this.flmsg.show(err.message,{cssClass: 'alert-danger', timeout: 3000});
} );


  }

}
