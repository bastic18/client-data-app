import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../model/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

import { SettingsService } from "./../../services/settings.service";
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client={

  firstName: "",
  lastName: "",
  email:"",
  phone:"",
  balance:0,
  Comment:"",
  Log:"",
  recentEvents:"",
  upcomingEvents:"",
  Priority: 0
}

disableBalanceOnEdit: boolean;

  constructor(
    private cls: ClientService, private route: Router, private aroute: ActivatedRoute, private flmsg: FlashMessagesService, private setser: SettingsService

  ) { }

  ngOnInit() {
    this.id=this.aroute.snapshot.params['id'];
    this.cls.getClient(this.id).subscribe(c=>{

      this.client=c;


    });
this.disableBalanceOnEdit= this.setser.getSettings().disableBalanceOnEdit;
  }
onSubmit( {value, valid}: {value: Client, valid: boolean}){
if (valid){
  // add id to client
  value.id=this.id;
// update client
this.cls.updateclient(value);
this.flmsg.show("Sucessfully updated client",{cssClass: 'alert-primary', timeout: 3500});
this.route.navigate([`/client/${this.id}`])
} else {
  this.flmsg.show("Please fill out form correctly!!",{cssClass: 'alert-danger', timeout: 3500});

}

}
}
