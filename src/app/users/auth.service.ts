import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor ( private http: HttpClient) {}
  currentUser: IUser;
  loginUser(userName: string, password: string) {
    const loginInfo = { username: userName, password: password };
    const options = {headers: new HttpHeaders({'Content_Type': 'application/json'})};
    return this.http.post('http://localhost:3000/users/login', loginInfo, options)
    .pipe(tap(data => {
      this.currentUser = <IUser>data['user'];
    }))
      .pipe(catchError(err => {
      return of(false);
    }));
  }
  isAuthenticated() {
    return !!this.currentUser;
  }
  // checkAuthenticationStatus() {
  //   console.log("in checkAuthenticationStatus");
  //   return this.http.get('http://localhost:3000/currentIdentity')
  //   .pipe(tap(data => {
  //     if (data instanceof Object) {
  //       this.currentUser = <IUser>data;
  //     }
  //   }))
  //   .subscribe();
  // }

  checkAuthenticationStatus(): Observable<IUser>{
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const options = {headers: new HttpHeaders({'Content_Type': 'application/json'})};
    console.log("calling currentIdentity")
    // return this.http.get<IUser>('http://localhost:3000/users/currentIdentity', options);

    this.http.get('http://localhost:3000/users/currentIdentity')
      .pipe(tap(data => {
        console.log('this is a data ' + data);
        if (data instanceof Object) {
          console.log("user is logged in?")
          this.currentUser = <IUser>data;
        }
      }))
      .subscribe();

    return this.http.get<IUser>('http://localhost:3000/users/currentIdentity');
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    const options = {headers: new HttpHeaders({'Content_Type': 'application/json'})};
    return this.http.put(`/users/${this.currentUser.id}`, this.currentUser , options);
  }
  logout() {
    this.currentUser = undefined;
    const options = {headers: new HttpHeaders({'Content_Type': 'application/json'})};
    return this.http.post('/logout', {}, options);
  }
}
