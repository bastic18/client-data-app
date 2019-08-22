import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Client } from '../model/Client';

//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  client_collection: AngularFirestoreCollection<Client>;
  client_Doc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;


  constructor( private fire: AngularFirestore) {
    this.client_collection= this.fire.collection('clients', ref=> ref.orderBy ('lastName','asc') );

   }

   getclientsdata(): Observable<Client[]> {
//getting id for client from the firebase
this.clients=this.client_collection.snapshotChanges().pipe( map(changes => {
  return changes.map(action=> {
    const info= action.payload.doc.data() as Client;
    info.id=action.payload.doc.id;
    return info;
  });
}));
return this.clients;
   }

   newClient(c: Client){
this.client_collection.add(c);
   }


   getClient(id: string): Observable<Client>{
this.client_Doc= this.fire.doc<Client>(`clients/${id}`);
this.client=this.client_Doc.snapshotChanges().pipe( map(action=> {
  if (action.payload.exists===false){
    //console.log ('yooo');
    return null;} else{
    const info= action.payload.data() as Client;
    info.id=action.payload.id;
    return info;
  }

}));

return this.client;

   }

   updateclient(client: Client){
this.client_Doc= this.fire.doc(`clients/${client.id}`);
this.client_Doc.update(client);
   }


   deleteClient(client: Client){
    this.client_Doc= this.fire.doc(`clients/${client.id}`);
    this.client_Doc.delete();
       }
}
