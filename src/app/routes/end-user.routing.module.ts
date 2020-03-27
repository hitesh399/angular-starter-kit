import { NgModule } from "@angular/core";
import { EndUserDashboard } from '../pages/end-user/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        EndUserDashboard
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: EndUserDashboard
            },
        ])
    ]
})
export class EndUserRoutingModule { }