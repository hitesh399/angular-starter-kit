import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/shared/toast/toast-service';

@Component({
    templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent {
    forgotPasswordForm: FormGroup;
    @Input() modalClose: Function;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private toast: ToastService) {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['']
        })
    }
    onSubmit(values) {
        this.toast.success('Submit Done.')
        console.log('Test ', values )
        this.modalClose()
    } 
}