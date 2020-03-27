import { CookieService } from "ngx-cookie-service";
import adminMenu from './admin.menu.json'
import endUserMenu from './end-user.menu.json'
import { Injectable } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
@Injectable()
export class SideBarMenu {
    constructor(private cookie: CookieService) { }
    
    get(): RouteInfo[] {
        return this.cookie.get('role') === 'admin' ? adminMenu : endUserMenu
    }
}