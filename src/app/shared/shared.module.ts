import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from './toast/toast.module';
import { SubmitButtonModule } from './button/submit/submit-button.module';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { ValidationModule } from './validation/validation.module';

@NgModule({
    imports: [
        /** Start Node Modules */
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        /** ENd  Node Modules */

        /** Start Shared Modules*/
        ToastModule,
        SubmitButtonModule,
        FooterModule,
        NavbarModule,
        SidebarModule,
        ValidationModule
        /** End Shared Modules */
    ],
    exports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        /** ENd  Node Modules */

        /** Start Shared Modules*/
        ToastModule,
        SubmitButtonModule,
        FooterModule,
        NavbarModule,
        SidebarModule,
        ValidationModule
    ]
})

export class SharedModule { }