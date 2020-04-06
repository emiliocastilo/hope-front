import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleCommonComponentComponent } from './core/components/example-common-component/example-common-component.component';
import { LoginComponent } from './core/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './core/services/login/login.service';
import { InterceptorService } from './core/services/interceptor/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ExampleCommonComponentComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
