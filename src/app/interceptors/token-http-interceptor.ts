import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { PrivateLayoutComponent } from '../layouts/private/private-layout.component';

@Injectable({
    providedIn: PrivateLayoutComponent
})
export class TokenHttpInterceptor implements HttpInterceptor {
    constructor(private cookie: CookieService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // All HTTP requests are going to go through this method
      
        // console.log('Ia sdkjshdkjsjdg')
        let newHeaders = req.headers;
        const token = this.cookie.get('ACCESS_TOKEN')
        if (token) {
            newHeaders = newHeaders.append('Authorization', 'Bearer ' + token)
        }
        const config = { headers: newHeaders }
        const authReq = req.clone(config);
        return next.handle(authReq)
    }
}
