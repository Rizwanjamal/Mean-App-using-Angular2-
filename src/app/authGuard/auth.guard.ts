import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { default as swal } from 'sweetalert2';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = Cookie.get('token');

        if (token && token !== "undefined") {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        swal(
            'Error!',
            'You must login to view that route!',
            'error'
        )
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
