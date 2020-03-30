import { NgModule } from "@angular/core";
import { ImageFormControl } from './image-form-control.component';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageControlCropperComponent } from './cropper/image-cropper.component'

@NgModule({
    declarations: [ImageFormControl, ImageControlCropperComponent],
    imports: [CommonModule, ImageCropperModule],
    entryComponents: [ImageControlCropperComponent],
    exports: [ImageFormControl, ImageControlCropperComponent],
})

export class ImageFormControlModule { }