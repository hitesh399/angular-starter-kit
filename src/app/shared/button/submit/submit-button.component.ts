import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
    templateUrl: './submit-button.html',
    selector: 'submit-btn'
})
export class SubmitButtonComponent implements OnInit {
    myForm: FormGroup;
    @Input() style: any;

    constructor(private controlContainer: ControlContainer) { }
    ngOnInit() {
        this.myForm = <FormGroup>this.controlContainer.control;
    }
    get isDisabled() {
        return this.myForm.disabled
    }
    get isInvalid() {
        return this.myForm.invalid
    }
}