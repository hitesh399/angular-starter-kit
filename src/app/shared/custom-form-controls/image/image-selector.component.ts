import { Component, OnInit, Input } from "@angular/core";
import { FormArray, ControlContainer, FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../validation/validation.service';

@Component({
    selector: 'image-selector',
    template: `<span (click)="openBrowser($event)"><input type="file" style="display:none" [id]="ID" (change)="onFileChange($event)" /><ng-content></ng-content></span>`
})

export class ImageSelectorComponent implements OnInit {

    private myForm: FormArray;
    @Input() rules: Array<any>
    public ID: string = ('_' + Date.now()).toString()

    constructor(private controlContainer: ControlContainer, private vs: ValidationService) { }
    ngOnInit() {

        // console.log('this.controlContainer.control', this.controlContainer.control)
        this.myForm = <FormArray>this.controlContainer.control;
    }
    onFileChange(event): void {

        const files = event.target.files
        if (this.myForm instanceof FormArray) {
            // this.myForm.
            const inputLenght = this.myForm.length
            for (let i = 0; i < files.length; i++) {
                this.myForm.insert((inputLenght + i), new FormControl(files[0], ...this.rules))
            }
        }
        // this.input.patchValue(this.orgFile)
        event.target.value = null
    }
    openBrowser(event): void {
        event.stopPropagation()
        const input = event.target.querySelector('[type="file"][id="' + this.ID + '"]')
        input ? input.click() : null
    }
}