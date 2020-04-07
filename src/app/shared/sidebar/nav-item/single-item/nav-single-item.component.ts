import { Component, Input, EventEmitter, ViewChildren, QueryList, OnInit, ContentChildren, OnChanges, Output } from "@angular/core";


@Component({
    templateUrl: './nav-single-item.html',
    selector: 'app-nav-single-item'
})
export class AppNavSingleItemComponent implements OnChanges {

    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

        if (changes.parentCollapsed !== undefined && changes.parentCollapsed.currentValue === true) {
            this.isCollapsed = true
        }

        if (changes.currentOpen !== undefined && changes.currentOpen.currentValue !== this.myIndex && this.isParent && this.isCollapsed === false) {
            this.isCollapsed = true
        }
    }

    @Input() item: any
    @Input() hasChildren: boolean = false
    @Input() parentCollapsed = true;
    @Input() isParent = false
    @Input() myIndex: number = -1
    @Input() currentOpen: number;

    @Output() onOpen: EventEmitter<number> = new EventEmitter<number>()

    public isCollapsed = true;


    toggle(event: Event) {
        this.isCollapsed = this.isCollapsed ? false : true
        if (this.isParent && this.isCollapsed === false)
            this.onOpen.emit(this.myIndex)
    }
}