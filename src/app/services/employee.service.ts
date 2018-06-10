import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "angularfire2/database";
import { Observable } from "rxjs";
import { Employee } from "../models/Employee";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  employees: AngularFireList<any>;
  employee: AngularFireObject<any>;

  constructor(public af: AngularFireDatabase) {
    this.employees = this.af.list("/employees") as AngularFireList<Employee[]>;
  }

  // get employees
  getEmployees() {
    return this.employees;
  }

  // add employee
  newEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  // get employee
  getEmployee(id: string) {
    this.employee = this.af.object("/employees/" + id) as AngularFireObject<
      Employee
    >;
    return this.employee;
  }

  //update employee
  updateEmployee(id: string, employee: Employee) {
    return this.employees.update(id, employee);
  }

  // delete employee
  deleteEmployee(id: string) {
    return this.employees.remove(id);
  }
}
