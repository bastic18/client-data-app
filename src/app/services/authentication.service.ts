import { Injectable } from '@angular/core';
import { AngularFireAuth} from "angularfire2/auth";
import { Observable } from "rxjs";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private afauth: AngularFireAuth) { }

login(email: string , password: string){
return new Promise ((resolve,reject)=>{
  this.afauth.auth.signInWithEmailAndPassword(email,password)
  .then (userData => resolve (userData),
  err=> reject(err))
});
}
getAuth(){
  return this.afauth.authState.pipe(map(auth=> auth));
}

logout(){
  this.afauth.auth.signOut();
}

register(email: string , password: string){
  return new Promise ((resolve,reject)=>{
    this.afauth.auth.createUserWithEmailAndPassword(email,password)
    .then (userData => resolve (userData),
    err=> reject(err))
  });
}

}
