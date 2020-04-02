import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'user-popup',
    template: `<form [formGroup]="userFrom" (ngSubmit)="onSubmit(form)" #myForm="ngForm">
            <user-frm-cmp formControlName="user" [btnLabel]="btnLabel" submitted="myForm.submitted"></user-frm-cmp>
        </form>`
})
export class UserPopupComponent implements OnInit {
    @Input() userdata: Object;
    @Input() btnLabel: string = 'Create'

    public modal: any;

    public userFrom: FormGroup;

    constructor(private fb: FormBuilder) {
        this.userFrom = this.fb.group({
            user: []
        })


    }
    ngOnInit() {
        if (this.userdata)
            this.userFrom.controls.user.setValue(this.userdata)
    }

    onSubmit() {
        console.log('On Submit...', this.userFrom)
        if (this.userFrom.invalid) return;

        this.modal.close()
    }
}