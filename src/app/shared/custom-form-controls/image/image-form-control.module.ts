import { NgModule } from "@angular/core";
import { ImageFormControlComponent } from './image-form-control.component';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageControlCropperComponent } from './cropper/image-cropper.component'
import { ImageSelectorComponent } from './image-selector.component';

@NgModule({
    declarations: [ImageFormControlComponent, ImageControlCropperComponent, ImageSelectorComponent],
    imports: [CommonModule, ImageCropperModule],
    entryComponents: [ImageControlCropperComponent],
    exports: [ImageFormControlComponent, ImageControlCropperComponent, ImageSelectorComponent],
})

export class ImageFormControlModule { }