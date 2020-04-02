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
    public loaded: boolean = false
    public cropperPosition = { x1: 0, y1: 0, x2: 50, y2: 50 }


    cropped(value: ImageCroppedEvent) {
        this.output = value
    }
    moveRight() {
        if (this.canvasRotation === -180) {
            this.canvasRotation = 0
        }
        this.canvasRotation = this.canvasRotation - 45
    }
    cropperReady() {
        this.loaded = true
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
    setZoom(event) {
        // console.log('event', event)
        const zoom = parseInt(event.target.value)
        this.transform = { ...this.transform, scale: zoom }
    }
    flipH() {
        this.transform = { ...this.transform, flipH: !this.transform.flipH }
    }
    flipV(){
        this.transform = { ...this.transform, flipV: !this.transform.flipV }
    }
}