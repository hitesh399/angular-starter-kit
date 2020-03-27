import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/shared/toast/toast-service';
import { SingleResourceContract } from 'src/app/contracts/single-resource.contract';
import { UserCreateComponent } from '../create/user-create.component';


@Component({
    templateUrl: './user-edit.html',
    selector: 'user-edit-cmp',
})
export class UserEditComponent extends UserCreateComponent implements OnInit {

    public userForm: FormGroup;
    public userId: Number;

    constructor(
        protected fromBuilder: FormBuilder,
        protected http: HttpClient,
        protected route: ActivatedRoute,
        protected toast: ToastService,
        protected router: Router

    ) {
        super(fromBuilder, http, route, toast, router)

        this.route.params.subscribe((response) => {
            this.userId = parseInt(response.id)
        });
    }

    onSubmit(values) {
        if (this.userForm.invalid) return

        this.userForm.disable()
        this.http.put(`users/${this.userId}`, values).forEach((res) => {
            this.userForm.enable()
            this.router.navigateByUrl('/admin/user')
            this.toast.success('User has been updated successfully.')
        }).catch(() => {
            this.userForm.enable()
        })
    }
    ngOnInit() {
        // console.log('Router', this.route)
        // let userId = 
        this.userForm.disable()
        this.http.get(`users/${this.userId}`).forEach((response: SingleResourceContract<Object>) => {
            // console.log('Response', response)
            this.userForm.patchValue(response.data)
            this.userForm.enable()
        })
    }
}