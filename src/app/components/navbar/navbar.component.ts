import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/Client';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AuthenticationService } from "./../../services/authentication.service";

import { SettingsService } from "./../../services/settings.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isLoggedin: boolean;
loggedinuser: string;
showRegister: boolean;


  constructor( private authserv: AuthenticationService, private router: Router,
    private flmsg: FlashMessagesService,private setserv:SettingsService) { }

  ngOnInit() {
    this.authserv.getAuth().subscribe(auth=> {
      if(auth){
this.isLoggedin=true;
this.loggedinuser=auth.email;
      } else {
        this.isLoggedin= false;
      }
    });
    this.showRegister= this.setserv.getSettings().allowRegistration;
  }

  onLogoutuser(){
this.authserv.logout();
this.flmsg.show("You have successfully logged out",{cssClass: 'alert-primary', timeout: 3000});
this.router.navigate(['/login']);
  }

}
