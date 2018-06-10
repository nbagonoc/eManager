import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FlashMessagesModule } from "angular2-flash-messages";

// ANGULAR FIRE
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

// SERVICE
import { EmployeeService } from "./services/employee.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";

// COMPONENTS
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmployeesComponent } from "./components/employees/employees.component";
import { EmployeeDetailsComponent } from "./components/employee-details/employee-details.component";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { EditEmployeeComponent } from "./components/edit-employee/edit-employee.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";

// ROUTES
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: "register", component: RegisterComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  {
    path: "add-employee",
    component: AddEmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employee/:id",
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-employee/:id",
    component: EditEmployeeComponent,
    canActivate: [AuthGuard]
  }
];

export const firebaseConfig = {
  apiKey: "AIzaSyAoZRO3tFp8NMMydW_sCl0sCnODWmEe1aw",
  authDomain: "employee-manager-313a3.firebaseapp.com",
  databaseURL: "https://employee-manager-313a3.firebaseio.com",
  messagingSenderId: "391084452730"
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    EmployeeService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
