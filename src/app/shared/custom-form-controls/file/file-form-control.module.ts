import { NgModule } from "@angular/core";
import { FileFormControlComponent } from './file-form-control.component';
import { FileSelectorComponent } from './file-selector.comonent';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [FileFormControlComponent, FileSelectorComponent],
    imports: [CommonModule],
    exports: [FileFormControlComponent, FileSelectorComponent]
})

export class FileFormControlModule { }