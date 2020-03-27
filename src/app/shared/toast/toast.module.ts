import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toast.component'
// import { ToastService } from './toast-service';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ToastComponent],
    imports: [  CommonModule, NgbModule],
    exports: [ToastComponent]
})
export class ToastModule { }