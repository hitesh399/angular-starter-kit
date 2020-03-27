import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/auth/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from '../pages/auth/forgot-password/forgot-password.component';

@NgModule({
    declarations: [
        LoginComponent,
        ForgotPasswordComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                component: LoginComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            }
        ]),

    ]
})
export class PublicRoutingModule { }