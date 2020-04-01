import { Component, Input, TemplateRef, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { FormActAs } from 'src/app/contracts/common.contract';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { FileChnageEvent } from 'src/app/shared/custom-form-controls/image/image-form-control.component';

@Component({
    templateUrl: './user-form.html',
    selector: 'user-frm-cmp'
})
export class UserFormComponent implements OnInit {
    @Input() userForm: FormGroup
    @Input() onSubmit: Function
    @Input() actAs: FormActAs
    @Input() btnLabel: String = 'Create'

    constructor(private validationService: ValidationService) { }
    ngOnInit() {
        console.log('this', this.userForm)
    }

    addAddress(index) {
        const addresses = this.userForm.get('addresses') as FormArray
        addresses.insert(index, new FormGroup({
            line1: new FormControl('', Validators.required),
            line2: new FormControl('')
        }))
    }
    removeAddress(index) {
        const addresses = this.userForm.get('addresses') as FormArray
        addresses.removeAt(index)
    }
    get addresses(): FormArray {
        return this.userForm.get('addresses') as FormArray
    }

    imageChange(e: FileChnageEvent) {
        console.log('Image Change', e)
    }

    get fileRules() {
        return [Validators.required, this.validationService.file({
            acceptedFiles: 'image/*',
            maxFileSize: 1,
            crop: true
        })]
    }
    get images(): FormArray {
        return this.userForm.get('profile_images') as FormArray
    }
    setErrors() {
        let errors = {
            email: 'Invalid Email!',
            first_name: 'Invalid First Name!',
            last_name: 'Invalid Last Name!',
            'addresses.0.line1': 'Invalid Line 1!'
        }

        const fieldNames = Object.keys(errors)

        console.log('sdsd', this.userForm)
        fieldNames.map(name => {
            const field = this.userForm.get(name) as FormControl
            if (field) {
                field.setErrors(errors[name])
            }
        })
    }
}