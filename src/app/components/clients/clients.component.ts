import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../modles/Client";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"]
})
export class ClientsComponent implements OnInit {
  clients: any[];
  totalOwed: number;

  constructor(public clientService: ClientService) {}

  ngOnInit() {
    this.clientService
      .getClients()
      .snapshotChanges()
      .subscribe(clients => {
        this.clients = [];
        clients.forEach(client => {
          let clientItem = client.payload.toJSON();
          clientItem["$key"] = client.key;
          this.clients.push(clientItem as Client);
        });
        // console.log(this.clients);

        // the total balance
        this.getTotalOwed();
      });

    // let x = this.clientService.getClients();
    // x.snapshotChanges().subscribe(item => {
    //   this.clients = [];
    //   item.forEach(element => {
    //     let y = element.payload.toJSON();
    //     y["$key"] = element.key;
    //     this.clients.push(y as Client);
    //   });
    // });

    // this.clientService
    //   .getClients()
    //   .valueChanges()
    //   .subscribe(clients => {
    //     this.clients = clients;
    //     console.log(this.clients);
    //   });
  }

  getTotalOwed() {
    let total = 0;
    for (let i = 0; i < this.clients.length; i++) {
      total += parseFloat(this.clients[i].balance);
    }
    this.totalOwed = total;
    // console.log(this.totalOwed);
  }
}
