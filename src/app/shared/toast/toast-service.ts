import { Injectable, TemplateRef } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: Object = {}) {

    this.toasts.push({ textOrTpl, ...options, id: (new Date).getTime() });
  }
  success(textOrTpl: string | TemplateRef<any>, options: Object = {}) {
    this.show(textOrTpl, { classname: 'bg-success text-light', ...options })
  }
  danger(textOrTpl: string | TemplateRef<any>, options: Object = {}) {
    this.show(textOrTpl, { classname: 'bg-danger text-light', ...options })
  }
  remove(toast) {
    this.toasts = this.toasts.filter(t => t.id != toast.id);
  }
}