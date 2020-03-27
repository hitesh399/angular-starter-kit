import { Injectable, ComponentFactoryResolver, Injector, Inject, TemplateRef, Type, ApplicationRef, EmbeddedViewRef, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalContract } from './modal.contract';

export type Content<T> = string | TemplateRef<T> | Type<T>;

@Injectable()
export class ModalService {
    componentRef: any;
    options: ModalContract;
    callBack: Function;
    disabled: Boolean = false;

    constructor(private resolver: ComponentFactoryResolver,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document,
        private appRef: ApplicationRef
    ) {
        this.close = this.close.bind(this)
        this.disable = this.disable.bind(this)
        this.enable = this.enable.bind(this)
    }

    open<T>(content: Content<T>, callBack?: Function, options: ModalContract = {}) {
        this.options = options
        const factory = this.resolver.resolveComponentFactory(ModalComponent);
        // console.log(callBack, 'callBack')
        this.callBack = callBack
        // console.log('factory', factory)
        // console.log('@@')
        const ngContent = this.resolveNgContent(content);

        this.componentRef = factory.create(this.injector, ngContent);


        (<ModalComponent>this.componentRef.instance).modal = this

        /**
         * When User passed A Call Back funciton
         */
        if (this.callBack)
            (<ModalComponent>this.componentRef.instance).isCallBack = true;

        const { title, showCancelBtn, cancelBtnLabel, showOKBtn, okBtnLabel, showFooter } = this.options
        if (title)
            (<ModalComponent>this.componentRef.instance).title = title;

        if (showCancelBtn)
            (<ModalComponent>this.componentRef.instance).showCancelBtn = showCancelBtn;

        if (cancelBtnLabel)
            (<ModalComponent>this.componentRef.instance).cancelBtnLabel = cancelBtnLabel;

        if (showOKBtn)
            (<ModalComponent>this.componentRef.instance).showOKBtn = showOKBtn;

        if (okBtnLabel)
            (<ModalComponent>this.componentRef.instance).okBtnLabel = okBtnLabel;

        if (showFooter)
            (<ModalComponent>this.componentRef.instance).showFooter = showFooter;

        this.appRef.attachView(this.componentRef.hostView)

        const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.document.body.appendChild(domElem);

        this.componentRef.hostView.detectChanges();

        this.document.body.classList.add('modal-open')
    }
    close() {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();

        this.document.body.classList.remove('modal-open')
    }
    disable() {
        (<ModalComponent>this.componentRef.instance).disabled = true
    }
    enable() {
        (<ModalComponent>this.componentRef.instance).disabled = false
    }
    done() {
        if (typeof this.callBack === 'function') {
            this.callBack({ close: this.close, disable: this.disable, enable: this.enable })
        }
    }
    resolveNgContent<T>(content: Content<T>) {
        if (typeof content === 'string') {
            const element = this.document.createTextNode(content);
            return [[element], [this.document.createTextNode('Second ng-content')]];
        }

        if (content instanceof TemplateRef) {
            const viewRef = content.createEmbeddedView(null);
            // console.log(viewRef)
            // In earlier versions, you may need to add this line
            // this.appRef.attachView(viewRef);
            return [viewRef.rootNodes];
        }

        console.log('I am sds', content)

        const factory = this.resolver.resolveComponentFactory(content);

        // const ngContent = this.resolveNgContent(content);
        const componentRef = factory.create(this.injector);
        const props = this.options.componentInputs ? this.options.componentInputs : {}
        // ().title = 'sjhdsdsd I a shdgsd';
        componentRef.instance['modalClose'] = this.close
        Object.keys(props).forEach(propKey => {
            componentRef.instance[propKey] = props[propKey]
        })
        componentRef.hostView.detectChanges();
        return [[componentRef.location.nativeElement], [this.document.createTextNode('Second ng-content')]];
    }

}