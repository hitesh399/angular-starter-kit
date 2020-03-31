import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    templateUrl: './image-cropper.html',
    styleUrls: ['./image-cropper.scss']
})
export class ImageControlCropperComponent {

    @Input() file: File
    @Input() aspectRatio: number

    modal: Object

    public transform = {
        scale: 1,
        rotate: 0,
        flipH: false,
        flipV: false
    }
    public output: ImageCroppedEvent;
    public canvasRotation: number = 0

    cropped(value: ImageCroppedEvent) {
        this.output = value
    }
    moveRight() {
        if (this.canvasRotation === -180) {
            this.canvasRotation = 0
        }
        this.canvasRotation = this.canvasRotation - 45
    }
    moveLeft() {
        if (this.canvasRotation === 180) {
            this.canvasRotation = 0
        }
        this.canvasRotation = this.canvasRotation + 45
    }
}