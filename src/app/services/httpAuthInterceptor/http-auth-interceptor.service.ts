import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs';
import { HttpInterceptorModule, HttpInterceptorService, getHttpHeadersOrInit } from 'ng-http-interceptor';
import 'rxjs/add/operator/do';


@Injectable()
export class HttpAuthInterceptorService {

 constructor(private router: Router, private http: Http, private httpInterceptor: HttpInterceptorService, 
            private httpInterceptorModule: HttpInterceptorModule) {
   
   this.init(); 
}
    
    private init() {

    this.httpInterceptor.request().addInterceptor((data, method) => {
      const headers = getHttpHeadersOrInit(data, method); // Get or create header and set back on `data`
      headers.append('auth-token', Cookie.get('token')); 
      return data;
    });


    this.httpInterceptor.response().addInterceptor((res, method) => {
       return res.do(
        (x) =>  { console.log('Do Next:', x); },
        (e : Response) => { 
          console.log('Do Error:', e);
          if (e.status === 401) {
          // redirect user to login screen here
          this.router.navigate(['/login']); 
          }},
        () => { console.log('Do Completed'); }
       );
    });

    }
    

}
