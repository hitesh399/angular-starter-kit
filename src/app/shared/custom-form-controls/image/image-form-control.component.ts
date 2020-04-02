import { Component, Input, OnDestroy, forwardRef, TemplateRef, Output, EventEmitter, HostBinding, OnInit } from "@angular/core";
import { ControlContainer, FormGroup, FormControl, AbstractControl, FormArray, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from '../../modal/modal.service';
import { ImageControlCropperComponent } from './cropper/image-cropper.component';

export interface FileChnageEvent {
  status: string;
  setUploadProcess(process: number): void;
  changeBusyStatus(status: boolean): void;
  input: AbstractControl
}


@Component({
  templateUrl: './image-form-control.html',
  selector: 'image-form-control',
  styleUrls: ['./image-form-control.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageFormControlComponent),
      multi: true
    }
  ]
})
export class ImageFormControlComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public myForm: FormGroup | FormArray;
  public imageUrl: string | ArrayBuffer;
  public isImage: boolean;
  public orgFile: File;
  public cropped: boolean = false
  public busy: boolean = false;
  public uploadProccess: number = 0;
  onChange: any = () => { };
  onTouched: any = () => { };

  @Input() formControlName: string | number
  @Input() minWidth: number = 150
  @Input() aspectRatio: number
  @Input() imageTpl: TemplateRef<any>;

  @Output() onImageChange: EventEmitter<FileChnageEvent> = new EventEmitter<FileChnageEvent>()

  public ID: string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  protected subscriptions: Subscription[] = []

  // @HostBinding('style.width') width: string = '100%';
  constructor(
    protected controlContainer: ControlContainer,
    protected modal: ModalService,

  ) {
    this.changeBusyStatus = this.changeBusyStatus.bind(this)
    this.setUploadProcess = this.setUploadProcess.bind(this)
  }


  changeBusyStatus(status: boolean): void {
    this.busy = status
  }
  setUploadProcess(process: number): void {
    this.uploadProccess = process
  }
  writeValue(obj: any): void {
    this.setImageUrl(obj)
    if (obj) {
      this.input.markAsTouched()
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }

  protected sendChangeData(status) {
    this.onImageChange.emit({
      input: this.input,
      setUploadProcess: this.setUploadProcess,
      changeBusyStatus: this.changeBusyStatus,
      status
    })
  }
  ngOnInit() {

    this.myForm = <FormGroup | FormArray>this.controlContainer.control;
    this.orgFile = this.input.value
    if (this.orgFile) {
      this.sendChangeData('org')
    }
    

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
  get isFile(): boolean {
    return this.input.value instanceof File
  }
  get input(): AbstractControl {
    return this.myForm instanceof FormArray ? this.myForm.controls[this.formControlName] : this.myForm.get(this.formControlName.toString())
  }
  get ins() {
    return this
  }
  get value() {
    return this.input.value
  }
  get isMultiple() {
    return this.myForm instanceof FormArray
  }
  onFileChange(event): void {
    this.orgFile = event.target.files[0]
    this.input.patchValue(this.orgFile)
    event.target.value = null
    this.sendChangeData('org');
  }
  openBrowser(event): void {
    event.target.closest('form').querySelector('[type="file"][id="' + this.ID + '"]').click()
  }

  setImageUrl(value: any): void {
    if (this.isFile) {
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        const target = event.target as any
        this.imageUrl = target.result
        this.isImage = this.imageUrl.toString().startsWith('data:image/')
      }
      fileReader.readAsDataURL(value)
    } else {
      this.imageUrl = value
    }
  }

  openCropper() {
    if (!this.isFile || !this.aspectRatio) return

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

      this.sendChangeData('cropped')
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

  remove(event) {
    event.stopPropagation()
    if (this.myForm instanceof FormArray) {
      this.myForm.removeAt(parseInt(this.formControlName.toString()))
    } else {
      this.input.setValue(null)
    }
  }
}
