import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { Client } from "../../modles/Client";
import { ClientService } from "../../services/client.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };

  // disableBalanceOnAdd: boolean = false;

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public clientService: ClientService
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    // if (this.disableBalanceOnAdd) {
    //   value.balance = 0;
    // }
    if (!valid) {
      // not valid
      this.flashMessagesService.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      this.router.navigate(["add-client"]);
    } else {
      // add new client
      this.clientService.newClient(value);
      this.flashMessagesService.show("Client added successfully", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/"]);
    }
  }
}
