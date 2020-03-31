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

    constructor() { }

    ngOnInit() {
    }

    close() {
        if (this.disabled) return
        this.modal.reject()
    }
    clickModalBox(event) {
        event.stopPropagation()
    }
    clickOutOfModalBox(event) {
        console.log('I am outside', this.persistent)
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