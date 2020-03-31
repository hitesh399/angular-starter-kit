import { Component, Input, OnDestroy, forwardRef  } from "@angular/core";
import { ControlContainer, FormGroup, FormControl, AbstractControl, FormArray, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from '../../modal/modal.service';
import { ImageControlCropperComponent } from './cropper/image-cropper.component';

@Component({
    templateUrl: './image-form-control.html',
    selector: 'image-form-control',
    styleUrls: ['./image-form-control.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef (() => ImageFormControlComponent),
            multi: true
        }
    ]
})
export class ImageFormControlComponent implements OnDestroy, ControlValueAccessor {

    public myForm: FormGroup | FormArray;
    public imageUrl: string | ArrayBuffer;
    public isImage: Boolean;
    public orgFile: File;
    public cropped: Boolean = false

    @Input() formControlName: string | number
    @Input() minWidth: number = 150
    @Input() aspectRatio: number
    @Input() busy: boolean = false;

    public ID: string = ('_' + Date.now()).toString()

    private subscriptions: Subscription[] = []

    constructor(
        private controlContainer: ControlContainer,
        private modal: ModalService,

    ) {
    }
    onChange: any = () => {};
    onTouched: any = () => {};
    writeValue(obj: any): void {
        this.setImageUrl(obj)
        if (obj) {
            this.input.markAsTouched()
        }
    }
    registerOnChange(fn: any): void {
        console.log('Reg')
        // throw new Error("Method not implemented.");
        this.onChange = fn;

        console.log('I am chnaged', this.onChange )
    }
    registerOnTouched(fn: any): void {
        // throw new Error("Method not implemented.");
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        // throw new Error("Method not implemented.");
    }
    ngOnInit() {

        // console.log('this.controlContainer.control', this.controlContainer.control)
        this.myForm = <FormGroup | FormArray>this.controlContainer.control;
        this.orgFile = this.input.value
        
        this.subscriptions.push(
            this.input.statusChanges.subscribe(status => {
                const { errors } = this.input
                const errorKeys = Object.keys(errors ? errors : {})
                if (
                    this.isFile &&
                    this.aspectRatio &&
                    !this.value.cropped &&
                    (
                        status === 'VALID' ||
                        (errorKeys.length === 1 && errorKeys[0] === 'file.crop')
                    )
                ) {
                    this.openCropper()
                }
            })
        )
    }
    get isFile(): Boolean {
        return this.input.value instanceof File
    }
    get input(): AbstractControl {
        return this.myForm instanceof FormArray ? this.myForm.controls[this.formControlName] : this.myForm.get(this.formControlName)
    }
    get value() {
        return this.input.value
    }
    onFileChange(event): void {
        // console.log('sds', event)
        // 
        this.orgFile = event.target.files[0]
        this.input.patchValue(this.orgFile)

        event.target.value = null
    }
    openBrowser(event): void {
        event.target.closest('form').querySelector('[type="file"][id="' + this.ID + '"]').click()
    }

    setImageUrl(value: any): void {
        if (this.isFile) {
            const fileReader = new FileReader()
            fileReader.onload = (event) => {
                const target = event.target as FileReader
                this.imageUrl = target.result
                this.isImage = !!this.imageUrl.toString().startsWith('data:image/')
            }
            fileReader.readAsDataURL(value)
        } else {
            this.imageUrl = value
        }
    }

    openCropper() {
        if (!this.isFile) return

        this.modal.open(ImageControlCropperComponent, {
            insideModalBody: false,
            persistent: true,
            componentInputs: {
                file: this.orgFile,
                aspectRatio: this.aspectRatio,
            }
        }).then(({ close, _this }) => {

            const name = this.orgFile.name
            const fileType = this.orgFile.type
            const blobdata = this.b64toBlob(_this.output.base64)
            let newFile = null
            if (typeof File === 'function') {
                newFile = new File([blobdata], name, {
                    type: fileType,
                    lastModified: Date.now()
                })
            } else {
                newFile = blobdata
                Object.defineProperty(newFile, 'name', {
                    value: name,
                    writable: false
                });
            }
            Object.defineProperty(newFile, 'cropped', {
                value: true
            })

            this.input.setValue(newFile)
            this.setImageUrl(newFile)
            close()

        }).catch(() => {
            if (this.isFile && this.isImage && !this.value.cropped) {
                this.input.setValue(null)
                this.orgFile = null
            }
        })
    }

    open() {
        window.open(URL.createObjectURL(this.value), "_blank");
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe())
    }
    b64toBlob(dataURI) {

        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: this.orgFile.type });
    }
}