import { ClientService } from '../../services/client.service';
import { Client } from '../../model/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
id: string;
balancequery: boolean=false;
client: Client;
balanceupdate: boolean=false;
  constructor(
    private cls: ClientService, private route: Router, private aroute: ActivatedRoute, private flmsg: FlashMessagesService

  ) { }

  ngOnInit() {
    //get id from url
    this.id=this.aroute.snapshot.params['id'];
    this.cls.getClient(this.id).subscribe(c=>{
      if (c!=null){
        if (c.balance>0){
          this.balancequery=true;
        }
      }
      this.client=c;
      console.log(this.client);
      // console.log("mad");
    });
  }
 updatebalance(){
this.cls.updateclient(this.client);
this.flmsg.show("Sucessfully updated balance",{cssClass: 'alert-success', timeout:3500});
// this.route.navigate(['clients/']);
 }
 deleteinfo(){
  if (confirm('Are you sure?')){
    this.cls.deleteClient(this.client);
    this.flmsg.show("Client Has Been Removed",{cssClass: 'alert-primary', timeout:3500});
    this.route.navigate(['/']);
  }
 }


}
