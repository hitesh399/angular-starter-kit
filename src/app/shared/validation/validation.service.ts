import { Injector, Injectable } from '@angular/core';
import { FileRulesContract, fileValidation } from './file.validate';
import { FormControl, ValidationErrors, AsyncValidatorFn, FormArray } from '@angular/forms';

export interface ValidationServiceContract {
  getValidatorErrorMessage(validatorName: string, validatorValue?: any);

  creditCardValidator(control: FormControl);
  emailValidator(control: FormControl): any;
  passwordValidator(control: FormControl): any;
  file(rules: FileRulesContract): AsyncValidatorFn
  arrayMax(ma: number): any

}

@Injectable({
  providedIn: 'root'
})

export class ValidationService implements ValidationServiceContract {
  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      required: 'Required',
      invalidCreditCard: 'Is invalid credit card number',
      invalidEmailAddress: 'Invalid email address',
      email: 'Invalid email address',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      'file.crop': 'Image must be crroped.',
      'file.maxFileSize': 'File size is too large.',
      'array.max': 'You exceed the max number.'
    };

    return config[validatorName];
  }

  creditCardValidator(control: FormControl) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (
      control.value.match(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
      )
    ) {
      return null;
    } else {
      return { invalidCreditCard: true };
    }
  }

  emailValidator(control: FormControl) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  passwordValidator(control: FormControl) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
  file(rules: FileRulesContract): AsyncValidatorFn {
    return function (control: FormControl) {
      return fileValidation(control.value, rules)
    }
  }
  arrayMax(max: number) {
    return function (control: FormArray) {
      return control.length > max ? { 'array.max': true } : null
    }
  }
}