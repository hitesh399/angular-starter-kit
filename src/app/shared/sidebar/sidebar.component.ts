import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SideBarMenu } from './menus/menu';




// console.log('adminMenu', adminMenu)

// export const ROUTES: RouteInfo[] = CookieService.

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    constructor(
        private router: Router,
        private cookie: CookieService,
        private menu: SideBarMenu
    ) {

    }
    ngOnInit() {
        this.menuItems = this.menu.get().filter(menuItem => menuItem);
    }
    logout() {
        this.cookie.delete('ACCESS_TOKEN', '/')
        this.router.navigateByUrl('/')
     }
}
