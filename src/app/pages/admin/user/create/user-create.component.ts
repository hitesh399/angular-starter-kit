import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast-service';

@Component({
    templateUrl: './user-create.html',
    selector: 'user-create-cmp'
})
export class UserCreateComponent {

    public userForm: FormGroup;

    constructor(
        protected fromBuilder: FormBuilder,
        protected http: HttpClient,
        protected route: ActivatedRoute,
        protected toast: ToastService,
        protected router: Router

    ) {
        this.userForm = this.fromBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            addresses: new FormArray([new FormGroup({
                line1: new FormControl('', Validators.required),
                line2: new FormControl('')
            })]),
            profile_image: new FormControl('', Validators.required)
        })
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(values) {
        // console.log('Teshgsdfsgh')
        if (this.userForm.invalid) return

        this.userForm.disable()
        this.http.post('users', values).forEach((res) => {
            this.userForm.enable()
            this.router.navigateByUrl('/admin/user')
            this.toast.success('User has been created successfully.')
        }).catch(() => {
            this.userForm.enable()
        })
    }
}