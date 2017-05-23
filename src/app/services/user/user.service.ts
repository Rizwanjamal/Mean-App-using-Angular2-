import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Observable} from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  @Output() getLoggedInUserName: EventEmitter<any> = new EventEmitter();

  constructor(private http : Http) { }

  //Login User
  login(username, password) {
    return new Promise((resolve, reject) => {
      this.http.post('/user/login', {username : username, password: password})
      .map(res => res.json())
      .subscribe(res => {
        this.getCurrentUser().subscribe();
        resolve(res); 
      }, (err) => {
        reject(err);
      });
    });
  }

  //Get Current User
  getCurrentUser() : Observable<boolean> {
     let username = Cookie.get('username');
      if(username!== null && username!== "undefined"){
        this.getLoggedInUserName.emit(username);
        return Observable.of(true);
      }
     return Observable.of(false);
  }

  //Get Logout
  logout() {
    return new Promise((resolve, reject) => {
      let username = Cookie.get('username');
      if(username!== null && username!== "undefined"){
        Cookie.deleteAll();
        resolve("Cookies Removed !");
      }
      else reject(null);      
    })   
  }

}
