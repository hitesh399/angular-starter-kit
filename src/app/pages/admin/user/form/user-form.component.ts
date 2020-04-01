import { Component, Input, TemplateRef, OnInit, forwardRef, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS } from '@angular/forms';

import { FormActAs } from 'src/app/contracts/common.contract';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { FileChnageEvent } from 'src/app/shared/custom-form-controls/image/image-form-control.component';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './user-form.html',
    selector: 'user-frm-cmp',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UserFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => UserFormComponent),
            multi: true
        }
    ]
})
export class UserFormComponent implements OnInit, ControlValueAccessor, OnDestroy {
    public userForm: FormGroup

    @Input() actAs: FormActAs
    @Input() btnLabel: String = 'Create'
    @Input() submitted: boolean

    onChange: any = () => { };
    onTouched: any = () => { };
    subscriptions: Subscription[] = [];

    constructor(private validationService: ValidationService, private fb: FormBuilder) {

        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            addresses: new FormArray([new FormGroup({
                line1: new FormControl('', Validators.required),
                line2: new FormControl(''),
                proof_file: new FormControl('', Validators.required, validationService.file({
                    maxFileSize: 1
                }))
            })]),
            profile_images: new FormArray([new FormControl('', Validators.required, validationService.file({
                acceptedFiles: 'image/*',
                maxFileSize: 1,
                crop: true
            }))]),
            single_file: new FormControl('', Validators.required, validationService.file({
                maxFileSize: 1
            }))
        })

        this.subscriptions.push(
            this.userForm.valueChanges.subscribe(value => {
                this.onChange(value);
                this.onTouched();
            })
        );


    }
    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    get value() {
        return this.userForm.value;
    }

    set value(value) {
        // console.log('value', value, this.userForm)
        this.userForm.patchValue(value);
        this.onChange(value);
        this.onTouched();
    }
    writeValue(value: any): void {
        if (value) {
            this.value = value;
        }

        if (value === null) {
            this.userForm.reset();
        }
    }
    registerOnChange(fn: any): void {
        // throw new Error("Method not implemented.");
        this.onChange = fn
    }
    registerOnTouched(fn: any): void {
        // throw new Error("Method not implemented.");
        this.onTouched = fn
    }
    setDisabledState?(isDisabled: boolean): void {
        // throw new Error("Method not implemented.");
        if (isDisabled) {
            this.userForm.disable()
        } else {
            this.userForm.enable()
        }
    }
    ngOnInit() {
        // console.log('this', this.userForm)
    }

    addAddress(index) {
        const addresses = this.userForm.get('addresses') as FormArray
        addresses.insert(index, new FormGroup({
            line1: new FormControl('', Validators.required),
            line2: new FormControl(''),
            proof_file: new FormControl('', Validators.required, this.validationService.file({
                maxFileSize: 1
            }))
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
    validate(_: FormControl) {

        // console.log(this.userForm.valid, 'valid', this.userForm)
        return this.userForm.valid ? null : { user: { valid: false } };
    }
}