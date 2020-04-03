import { Component, Input, OnInit, ViewChildren, QueryList } from "@angular/core";

@Component({
    selector: 'app-nav-item',
    templateUrl: './nav-item.html'
})
export class AppNavItemComponent implements OnInit {

    @Input() items: Array<object>
    @Input() parentCollapsed: boolean = true;
    @Input() isParent = true

    public menuItems: Array<object> = []
    public currentOpen: number = -1

    ngOnInit(): void {
        this.menuItems = this.items.map((item, i) => {
            item['_id'] = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            return item
        })
    }
    openParentItem(openIndex) {
        console.log('status', openIndex)
        this.currentOpen = openIndex
    }
}