import { Component, Input, TemplateRef, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { FormActAs } from 'src/app/contracts/common.contract';

@Component({
    templateUrl: './user-form.html',
    selector: 'user-frm-cmp'
})
export class UserFormComponent implements OnInit {
    @Input() userForm: FormGroup
    @Input() onSubmit: Function
    @Input() actAs: FormActAs
    @Input() btnLabel: String = 'Create'

    ngOnInit() {
        // console.log('this', this)
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