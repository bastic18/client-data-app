import { ClientService } from '../../services/client.service';
import { Client } from '../../model/Client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
clients: Client[];
sum_balanced: number;
  constructor( private cl_service: ClientService) { }

  ngOnInit() {
    this.cl_service.getclientsdata().subscribe(data => {this.clients=data;
    this.getbalance();
  });

  }
getbalance(){
 const sum= this.clients.reduce((total,client)=> {
   return total + parseFloat(client.balance.toString());
  },0);

//   var sum=0;
//   var i;
//   for (i=0; i < this.clients.length; i++ ) {

// console.log(this.clients);
// for (let x=0; x< this.clients[i].length; x++){
//   console.log(this.clients[x]);
// }
//   }
this.sum_balanced= sum;
}
}
