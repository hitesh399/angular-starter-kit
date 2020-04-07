import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast-service';
import { ValidationService } from 'src/app/shared/validation/validation.service';


@Component({
    templateUrl: './user-create.html',
    selector: 'user-create-cmp'
})
export class UserCreateComponent {

    public form: FormGroup;

    constructor(
        protected fromBuilder: FormBuilder,
        protected http: HttpClient,
        protected route: ActivatedRoute,
        protected toast: ToastService,
        protected router: Router,
        protected validationService: ValidationService

    ) {


        this.form = this.fromBuilder.group({
            user: []
        })
    }
    onSubmit() {
        if (this.form.invalid) return
        this.form.disable()
        this.http.post('users', this.form.value.user).forEach((res) => {
            this.form.enable()
            this.router.navigateByUrl('/admin/user')
            this.toast.success('User has been created successfully.')
        }).catch(() => {
            this.form.enable()
        })
    }
}