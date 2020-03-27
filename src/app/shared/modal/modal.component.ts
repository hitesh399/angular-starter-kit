import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.html'
})
export class ModalComponent implements OnInit {

    title: String = '';
    disabled: Boolean = false;
    isCallBack: Boolean = false;
    showCancelBtn: Boolean = true;
    cancelBtnLabel: String = 'Cancel';
    showOKBtn: Boolean = true;
    okBtnLabel: String = 'Ok';
    showFooter: Boolean = true
    modal: any;
    constructor() { }

    ngOnInit() {
    }

    close() {
        if (this.disabled) return
        this.modal.close()
    }
    clickModalBox(event) {
        event.stopPropagation()
    }
    clickOutOfModalBox(event) {
        event.preventDefault()
        this.close()
    }
    done(event) {
        if (this.disabled) return
        event.preventDefault()
        if (typeof this.isCallBack) {
            this.modal.done()
        } else {
            this.close()
        }
    }

}