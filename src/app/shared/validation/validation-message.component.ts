import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
    selector: 'v-message',
    template: `
    <div class="invalid-feedback" [style]="{display: 'block'}" *ngIf="errorMessage !== null">{{errorMessage}}</div>
  `
})
export class ValidationMessageComponent {

    @Input() control: FormControl;
    constructor() { }

    get errorMessage() {

        if (typeof this.control.errors === 'string') {
            return this.control.errors
        }
        for (let propertyName in this.control.errors) {
            if (
                this.control.errors.hasOwnProperty(propertyName) &&
                this.control.touched
            ) {

                const error = ValidationService.getValidatorErrorMessage(
                    propertyName,
                    this.control.errors[propertyName]
                );
                return error ? error : propertyName
            }
        }

        return null;
    }
}