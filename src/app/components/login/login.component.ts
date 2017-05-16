import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Response }  from "@angular/http";
import { HttpAuthInterceptorService } from '../../services/httpAuthInterceptor/http-auth-interceptor.service';
import { default as swal } from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = {};
  model: any = {};
  loading = false;

  constructor(private router: Router, private userService: UserService, private httpAuthInterceptor : HttpAuthInterceptorService) { }

  ngOnInit() {

  }

  login() {
    this.loading = true; 
    this.userService.login(this.model.username, this.model.password).then((res) => {
      console.log(res);
      Cookie.set('token', res['token']);
      swal(
          'Login Successfully !',
          'Login successfully !',
          'success'
        )
      this.router.navigate(['/books']);
    }, (err : Response) =>{
      err['errorMessage'] = err.json().err.errorMessage;
      this.loading = false;
      this.error = err; 
      swal(
          'Login Error !',
          this.error['errorMessage'],
          'error'
        )
    });
  }
}
