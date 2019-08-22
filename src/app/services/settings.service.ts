import { Injectable } from '@angular/core';

import { Settings } from "./../model/Settings";
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
// settings={
//   allowRegistration: true,
//   disableBalanceOnAdd: false,
//   disableBalanceOnEdit: false }

  settings: Settings={
    allowRegistration: false,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true }

  constructor( ) {
    if (localStorage.getItem('settings')!=null){
      this.settings=JSON.parse(localStorage.getItem('settings'));
    }
   }

// getSettings(){
// return this.settings;

// }

getSettings(): Settings{
  return this.settings;

  }
  changeSettings(s: Settings){
    localStorage.setItem('settings', JSON.stringify(s));
  }
}
