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
import { ClientService } from "./services/client.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";

// COMPONENTS
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { AddClientComponent } from "./components/add-client/add-client.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

// ROUTES
const appRoutes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  {
    path: "add-client",
    component: AddClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "client/:id",
    component: ClientDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-client/:id",
    component: EditClientComponent,
    canActivate: [AuthGuard]
  }
];

export const firebaseConfig = {
  apiKey: "AIzaSyCz31goPmRQ1Sl29DRuBc4GH6yvPUQ1Q08",
  authDomain: "angular-fire-849f9.firebaseapp.com",
  databaseURL: "https://angular-fire-849f9.firebaseio.com",
  storageBucket: "angular-fire-849f9.appspot.com",
  messagingSenderId: "64375233909"
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NotFoundComponent
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
    ClientService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
