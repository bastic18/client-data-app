import { Injectable } from "@angular/core";
import {CanActivate, Router} from "@angular/router";

import { map } from 'rxjs/operators';
import { SettingsService } from "./../services/settings.service";
@Injectable ()

export class RegisterGuard implements CanActivate{

constructor(  private router: Router, private setserv: SettingsService){}

canActivate(): boolean{
if (this.setserv.getSettings().allowRegistration){
  return true;
} else {
  this.router.navigate(['/login']);
  return false;
}


}

}
