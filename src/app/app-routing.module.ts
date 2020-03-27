import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public/public-layout.component';
import { SharedModule } from './shared/shared.module';
import { PrivateLayoutComponent } from './layouts/private/private-layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonHttpInterceptor } from './interceptors/common-http-interceptor';
import { TokenHttpInterceptor } from './interceptors/token-http-interceptor';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './contracts/common.contract';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: PublicLayoutComponent,
    loadChildren: './routes/public.routing.module#PublicRoutingModule'
  },
  {
    path: 'admin',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: './routes/admin.routing.module#AdminRoutingModule'
  },
  {
    path: 'end-user',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: './routes/end-user.routing.module#EndUserRoutingModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    PublicLayoutComponent,
    PrivateLayoutComponent,
    PageNotFoundComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
