import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../shared/toast/toast-service';
import { Roles } from '../contracts/common.contract';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private cookie: CookieService,
        private toast: ToastService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.isUnauthentidated()) {

            this.router.navigate(['/']).then(() => {
                this.toast.danger('Please login first.')
            })
            return false
        } else if (this.isUnauthorised(route)) {
            this.router.navigate(['/']).then(() => {
                this.toast.danger('You do not have privilege to access this link.')
            })
            return false
        }
        return true
    }
    isUnauthentidated() {
        return !this.cookie.get('ACCESS_TOKEN')
    }
    isUnauthorised(route: ActivatedRouteSnapshot) {
        const activeRole = this.cookie.get('role');
        return !route.url.toString().startsWith(activeRole)
    }
}