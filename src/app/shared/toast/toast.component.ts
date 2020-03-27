import { ToastService } from './toast-service';
import { Component, OnInit, TemplateRef } from '@angular/core'

@Component({
    selector: 'app-toasts',
    templateUrl: './toast.html',
    styleUrls: ['./toast.scss']
})
export class ToastComponent implements OnInit {
    constructor(public toastService: ToastService) { }

    isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

    ngOnInit() {
        // console.log(this.toastService, 'toastService')
    }
}