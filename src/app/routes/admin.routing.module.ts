import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../pages/admin/dashboard/dashboard.component';
import { UserListComponent } from '../pages/admin/user/user-list.component';
import { UserEditComponent } from '../pages/admin/user/edit/user-edit.component';
// import { UserFormComponent } from '../pages/admin/user/form/user-form.component';
import { UserCreateComponent } from '../pages/admin/user/create/user-create.component';

@NgModule({
    declarations: [
        DashboardComponent,
        // UserFormComponent,
        UserListComponent,
        UserEditComponent,
        UserCreateComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([{
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
        },
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'user',
            children: [
                {
                    path: '',
                    component: UserListComponent
                },
                {
                    path: ':id/edit',
                    component: UserEditComponent
                },
                {
                    path: 'create',
                    component: UserCreateComponent
                }
            ]
        }])
    ]
})
export class AdminRoutingModule { }