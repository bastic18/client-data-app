import { Client } from '../../model/Client';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

import { SettingsService } from "./../../services/settings.service";
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
client: Client={
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  balance: 0,
  Comment: "",
  Log: "",
  recentEvents:"",
  upcomingEvents:"",
  Priority: 0

}


balanced_disabled: boolean;
@ViewChild('clientdataForm',{static: false}) form : any;

  constructor( private flashmsg: FlashMessagesService, private cls: ClientService, private route: Router,private setserv: SettingsService) { }

  ngOnInit() {
    this.balanced_disabled=this.setserv.getSettings().disableBalanceOnAdd;
  }
submitdataForm({value, valid}:{value: Client , valid: boolean }){
if (this.balanced_disabled){
  value.balance=0;
}
if (!valid){
  //show error
  this.flashmsg.show('Complete the entire form correctly!!!',{  cssClass: 'alert-danger', timeout: 5000});
} else{
  //add new client and then go to home
this.cls.newClient(value);
  this.flashmsg.show('Sucessfully added new client!!!',{  cssClass: 'alert-success', timeout: 3000});

  this.route.navigate(['/']);
}
}
}
