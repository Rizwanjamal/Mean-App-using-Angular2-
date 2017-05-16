import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http : Http) { }

  //login user
  login(username, password) {
    return new Promise((resolve, reject) => {
      this.http.post('/user/login', {username : username, password: password})
      .map(res => res.json())
      .subscribe(res => {
        resolve(res); 
      }, (err) => {
        reject(err);
      });
    });
  }

}
