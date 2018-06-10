import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Client } from "../../modles/Client";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.css"]
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };

  // disableBalanceOnEdit: boolean = true;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];

    // get client
    this.clientService
      .getClient(this.id)
      .valueChanges()
      .subscribe(client => {
        this.client = client;
      });
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    // if (this.disableBalanceOnEdit) {
    //   value.balance = 0;
    // }
    if (!valid) {
      // not valid
      this.flashMessagesService.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      this.router.navigate(["edit-client/" + this.id]);
    } else {
      // update client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show("Client successfully edited", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/client/" + this.id]);
    }
  }
}
