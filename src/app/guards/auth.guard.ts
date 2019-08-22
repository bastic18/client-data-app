import { Injectable } from "@angular/core";
import {CanActivate, Router} from "@angular/router";

import { Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";

import { map } from 'rxjs/operators';
@Injectable ()

export class AuthGuard implements CanActivate{

constructor(  private router: Router, private afauth: AngularFireAuth){}

canActivate(): Observable<boolean>{
return this.afauth.authState.pipe(map (authentication=>{
  if (!authentication){
    this.router.navigate(['/login']);
    return false;
  } else { return true;}
}));


}

}
