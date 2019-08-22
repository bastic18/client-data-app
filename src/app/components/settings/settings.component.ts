import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


import { SettingsService } from "./../../services/settings.service";
import { Settings } from "./../../model/Settings";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
settings: Settings;
  constructor(private router: Router,
    private flmsg: FlashMessagesService,private setserv:SettingsService) { }

  ngOnInit() {
    this.settings=this.setserv.getSettings();

  }
onSubmit(){
  this.setserv.changeSettings(this.settings);
  this.flmsg.show("Settings saved",{cssClass: 'alert-primary', timeout: 3000});
}
}
