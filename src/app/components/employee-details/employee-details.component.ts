import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../services/employee.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Employee } from "../../models/Employee";

@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.css"]
})
export class EmployeeDetailsComponent implements OnInit {
  id: string;
  employee: Employee;

  constructor(
    public employeeService: EmployeeService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    // get id
    this.id = this.route.snapshot.params["id"];

    // get employee
    this.employeeService
      .getEmployee(this.id)
      .valueChanges()
      .subscribe(employee => {
        this.employee = employee;
      });
  }

  onDelete() {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.employeeService.deleteEmployee(this.id);
      this.flashMessagesService.show("Employee Deleted", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/dashboard"]);
    }
  }
}
