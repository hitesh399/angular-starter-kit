import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/shared/toast/toast-service';
import { SingleResourceContract } from 'src/app/contracts/single-resource.contract';
import { UserCreateComponent } from '../create/user-create.component';
import { ValidationService } from 'src/app/shared/validation/validation.service';


@Component({
    templateUrl: './user-edit.html',
    selector: 'user-edit-cmp',
})
export class UserEditComponent  implements OnInit {

    public userForm: FormGroup;
    public userId: number;

    constructor(
        protected fromBuilder: FormBuilder,
        protected http: HttpClient,
        protected route: ActivatedRoute,
        protected toast: ToastService,
        protected router: Router,
        protected validationService: ValidationService

    ) {
        this.userForm = this.fromBuilder.group({
            user: []
        })
        this.route.params.subscribe((response) => {
            this.userId = parseInt(response.id)
        });
    }

    onSubmit() {
        
        if (this.userForm.invalid) return
        this.userForm.disable()
        this.http.put(`users/${this.userId}`,  this.userForm.value.user).forEach((res) => {
            this.userForm.enable()
            this.router.navigateByUrl('/admin/user')
            this.toast.success('User has been updated successfully.')
        }).catch(() => {
            this.userForm.enable()
        })
    }
    ngOnInit() {
        
        this.userForm.disable()
        this.http.get(`users/${this.userId}`).forEach((response: SingleResourceContract<Object>) => {
            // console.log('Response', response)
            this.userForm.controls.user.setValue(response.data)
            this.userForm.enable()
        })
    }
}
