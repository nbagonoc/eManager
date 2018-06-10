import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { Employee } from "../../models/Employee";
import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"]
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    firstName: "",
    lastName: "",
    address: "",
    position: ""
  };

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public employeeService: EmployeeService
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Employee; valid: boolean }) {
    if (!valid) {
      // not valid
      this.flashMessagesService.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      this.router.navigate(["add-employee"]);
    } else {
      // add new employee
      this.employeeService.newEmployee(value);
      this.flashMessagesService.show("Employee added successfully", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/dashboard"]);
    }
  }
}
