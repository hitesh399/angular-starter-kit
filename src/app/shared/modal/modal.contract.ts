export interface ModalContract {
    title?: string,
    componentInputs?: object,
    showCancelBtn?: boolean,
    cancelBtnLabel?: string,
    showOKBtn?: boolean,
    okBtnLabel?: string,
    showFooter?: boolean,
    insideModalBody?: boolean,
    persistent?: boolean
    modalClass?: string
}