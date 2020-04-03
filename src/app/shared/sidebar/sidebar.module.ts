import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { AppNavItemComponent } from './nav-item/nav-item.component';
import { AppNavSingleItemComponent } from './nav-item/single-item/nav-single-item.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [SidebarComponent, AppNavItemComponent, AppNavSingleItemComponent],
    imports: [RouterModule, CommonModule, NgbCollapseModule],
    exports: [SidebarComponent, AppNavItemComponent, AppNavSingleItemComponent]
})

export class SidebarModule { }
