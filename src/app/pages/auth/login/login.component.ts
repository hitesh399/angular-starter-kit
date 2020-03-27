import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'src/app/shared/toast/toast-service';


@Component({
    selector: 'login-cmp',
    templateUrl: './login.html'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private toaster: ToastService,
        private router: Router,
        private cookie: CookieService
    ) {
        this.loginForm = this.formBuilder.group({
            email: this.formBuilder.control('', [Validators.required, Validators.email]),
            password: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
            role: this.formBuilder.control('', [Validators.required,]),
        })
        
    }

    ngOnInit() {
        if (this.cookie.get('ACCESS_TOKEN')) {
            const activeRole = this.cookie.get('role');
            this.router.navigateByUrl('/' + activeRole)
        }
    }

    onSubmit(values) {

        if (this.loginForm.invalid) return
        this.loginForm.disable()
        this.http.post('/login', values).forEach((response: any) => {
            this.loginForm.enable()
            // if (values.role)
            this.cookie.set('role', values.role, undefined, '/')
            this.cookie.set('ACCESS_TOKEN', response.token, undefined, '/')
            // if () 
            this.router.navigateByUrl(values.role === 'admin' ? '/admin' : '/end-user')
            this.toaster.success('Logged In Successfully.')
        }).catch((e) => {
            this.toaster.danger('Login Credentails are wrong.')
            this.loginForm.enable()
        })
    }

}