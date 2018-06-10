import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../services/employee.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Employee } from "../../models/Employee";

@Component({
  selector: "app-edit-employee",
  templateUrl: "./edit-employee.component.html",
  styleUrls: ["./edit-employee.component.css"]
})
export class EditEmployeeComponent implements OnInit {
  id: string;
  employee: Employee = {
    firstName: "",
    lastName: "",
    address: "",
    position: ""
  };

  // disableBalanceOnEdit: boolean = true;

  constructor(
    public employeeService: EmployeeService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];

    // get employee
    this.employeeService
      .getEmployee(this.id)
      .valueChanges()
      .subscribe(employee => {
        this.employee = employee;
      });
  }

  onSubmit({ value, valid }: { value: Employee; valid: boolean }) {
    if (!valid) {
      // not valid
      this.flashMessagesService.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      this.router.navigate(["edit-employee/" + this.id]);
    } else {
      // update employee
      this.employeeService.updateEmployee(this.id, value);
      this.flashMessagesService.show("Employee successfully edited", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/employee/" + this.id]);
    }
  }
}
