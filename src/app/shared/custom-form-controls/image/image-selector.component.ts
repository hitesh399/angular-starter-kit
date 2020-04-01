import { Component, OnInit, Input, TemplateRef, ContentChild } from "@angular/core";
import { FormArray, ControlContainer, FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../validation/validation.service';



@Component({
    selector: 'image-selector',
    template: `
        <div class="custom-file-selector">
        <input multiple type="file" accept="image/*" style="display:none" [id]="ID" (change)="onFileChange($event)" />
        <ng-template #defaultTpl>
        <span  (click)="openBrowser($event)">
            Choose
        </span>
        </ng-template>
        <ng-container *ngTemplateOutlet="template ? template: defaultTpl; context: {$implicit: openBrowser}"></ng-container>
        </div>`
})

export class ImageSelectorComponent implements OnInit {

    private myForm: FormArray;
    @Input() rules: Array<any>
    public ID: string = ('_' + Date.now()).toString()
    @ContentChild('default', { static: true }) template: TemplateRef<any>;

    constructor(private controlContainer: ControlContainer, private vs: ValidationService) { 
        this.openBrowser = this.openBrowser.bind(this)
    }
    ngOnInit() {
        this.myForm = <FormArray>this.controlContainer.control;
    }
    onFileChange(event): void {

        const files = event.target.files
        if (this.myForm instanceof FormArray) {

            this.myForm.controls.forEach((v, i) => {
                if (!v.value) {
                    this.myForm.removeAt(i)
                }
            })
            const inputLenght = this.myForm.length
            for (let i = 0; i < files.length; i++) {
                this.myForm.insert((inputLenght + i), new FormControl(files[i], ...this.rules))
            }
        }
        event.target.value = null
    }
    openBrowser(event): void {
        event.stopPropagation()
        const input = event.target.closest('.custom-file-selector').querySelector('[type="file"][id="' + this.ID + '"]')
        input ? input.click() : null
    }
}