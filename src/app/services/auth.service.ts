import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  // login user
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  //register user
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  // user status
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  // logout user
  logout() {
    this.afAuth.auth.signOut();
  }
}
