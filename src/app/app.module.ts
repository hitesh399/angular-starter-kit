import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ModalService } from './shared/modal/modal.service';
import { ModalComponent } from './shared/modal/modal.component';
import { SideBarMenu } from './shared/sidebar/menus/menu'; 

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,

  ],
  providers: [ModalService, SideBarMenu],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }