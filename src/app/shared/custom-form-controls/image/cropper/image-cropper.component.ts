import { Component, Input, OnInit, OnChanges, ViewChild } from "@angular/core";
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
    templateUrl: './image-cropper.html',
    styleUrls: ['./image-cropper.scss']
})
export class ImageControlCropperComponent implements OnInit {

    @Input() file: File
    @Input() aspectRatio: number


    @ViewChild(ImageCropperComponent, { static: true }) imageCropper: ImageCropperComponent

    public modal: Object

    public transform = {
        scale: 1,
        rotate: 0,
        flipH: false,
        flipV: false
    }
    public output: ImageCroppedEvent;
    public canvasRotation: number = 0
    public format: string


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
    ngOnInit() {
        const type = this.file.type.split('/')
        this.format = type[1] ? type[1] : type[0]
    }
}