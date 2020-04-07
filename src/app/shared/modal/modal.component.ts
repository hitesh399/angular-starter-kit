import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.html'
})
export class ModalComponent implements OnInit {

    title: String = '';
    disabled: Boolean = false;
    showCancelBtn: Boolean = true;
    cancelBtnLabel: String = 'Cancel';
    showOKBtn: Boolean = true;
    okBtnLabel: String = 'Ok';
    showFooter: Boolean = true
    modal: any;
    insideModalBody: Boolean = true
    persistent: Boolean = false
    modalClass: string

    constructor() { }

    ngOnInit() {
        console.log('show Footer', this.showFooter)
    }

    close(event?: Event) {
        if (event instanceof Event) {
            event.preventDefault()
        }
        if (this.disabled) return
        this.modal.reject()
    }
    clickModalBox(event) {
        event.stopPropagation()
    }
    clickOutOfModalBox(event) {
        if (this.persistent) return
        event.preventDefault()
        this.close()
    }
    done(event) {
        if (this.disabled) return
        event.preventDefault()
        this.modal.done()
    }

}