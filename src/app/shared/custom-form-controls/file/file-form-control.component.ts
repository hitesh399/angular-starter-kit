import { Component, forwardRef, OnInit } from "@angular/core";
import { ImageFormControlComponent } from '../image/image-form-control.component';
import { ControlContainer, NG_VALIDATORS, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalService } from '../../modal/modal.service';

@Component({
    templateUrl: './file-form-control.html',
    selector: 'file-form-control',
    styleUrls: ['./file-form-control.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileFormControlComponent),
            multi: true
        }
    ]
})
export class FileFormControlComponent extends ImageFormControlComponent implements ControlValueAccessor {
    
}