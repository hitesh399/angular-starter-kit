import { Component, Input, OnDestroy } from "@angular/core";
import { ControlContainer, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ModalService } from '../../modal/modal.service';
import { ImageControlCropperComponent } from './cropper/image-cropper.component';

@Component({
    templateUrl: './image-form-control.html',
    selector: 'image-form-control',
    styleUrls: ['./image-form-control.scss']
})
export class ImageFormControl implements OnDestroy {

    public myForm: FormGroup;
    public imageUrl: string | ArrayBuffer;
    public isImage: Boolean;
    public orgFile: File;
    public cropped: Boolean = false

    @Input() name: string
    @Input() minWidth: number = 150
    @Input() aspectRatio: number = 1/1 

    public changeSubscribe: Subscription;
    public statusChangeSubscribe: Subscription;

    constructor(
        private controlContainer: ControlContainer,
        private modal: ModalService
    ) {
    }
    ngOnInit() {
        this.myForm = <FormGroup>this.controlContainer.control;

        this.changeSubscribe = this.input.valueChanges.subscribe((file) => {
            this.setImageUrl(file)
        })

        this.statusChangeSubscribe = this.input.statusChanges.subscribe(status => {
            // console.log('Value Changed and validated.', v)
            if (this.cropped === false && status === 'VALID') {
                this.openCropper()
            }
        })
    }
    get isFile(): Boolean {
        return this.input.value instanceof File
    }
    get input(): AbstractControl {
        return this.myForm.get(this.name)
    }
    get value() {
        return this.input.value
    }
    onFileChange(event): void {
        this.input.markAsTouched()
        this.orgFile = event.target.files[0]
        this.myForm.patchValue({
            [this.name]: this.orgFile
        })
    }
    openBrowser(event): void {
        event.target.closest('form').querySelector('[type="file"][name="' + this.name + '"]').click()
    }

    setImageUrl(value: any): void {
        if (this.isFile) {
            const fileReader = new FileReader()
            fileReader.onload = (event) => {
                // console.log('event.target.', event)
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
        // console.log('I am here to open')
        this.modal.open(ImageControlCropperComponent, ({ close, _this }) => {
            
            const name = this.orgFile.name
            const fileType = this.orgFile.type
            const blobdata = this.b64toBlob(_this.output.base64)
            let newFile  = null
            if (typeof File === 'function') {
                newFile  = new File([blobdata], name, {
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
            this.cropped = true
            this.myForm.patchValue({
                [this.name]: newFile
            })

            this.setImageUrl(newFile)
            close()

        }, {
            okBtnLabel: 'Crop',
            componentInputs: {
                file: this.orgFile,
                aspectRatio: this.aspectRatio
            }
        })
    }

    open() {
        window.open(URL.createObjectURL(this.value), "_blank"); 
    }

    ngOnDestroy() {
        this.changeSubscribe.unsubscribe()
        this.statusChangeSubscribe.unsubscribe()
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