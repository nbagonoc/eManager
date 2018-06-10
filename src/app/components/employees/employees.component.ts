import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../services/employee.service";
import { Employee } from "../../models/Employee";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"]
})
export class EmployeesComponent implements OnInit {
  employees: any[];
  totalOwed: number;

  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService
      .getEmployees()
      .snapshotChanges()
      .subscribe(employees => {
        this.employees = [];
        employees.forEach(employee => {
          let employeeItem = employee.payload.toJSON();
          employeeItem["$key"] = employee.key;
          this.employees.push(employeeItem as Employee);
        });
      });
  }
}
