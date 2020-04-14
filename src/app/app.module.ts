import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { LoginService } from './core/services/login/login.service';
import { InterceptorService } from './core/services/interceptor/interceptor.service';
import { HomeComponent } from './core/components/home/home.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SideBarComponent } from './core/components/side-bar/side-bar.component';
import { SideBarLinkComponent } from './core/components/side-bar/side-bar-link/side-bar-link.component';
import { HomeDashboardComponent } from './core/components/home/home-dashboard/home-dashboard.component';
import { SideBarMenuComponent } from './core/components/side-bar/side-bar-menu/side-bar-menu.component';
import { HomeDashboardModuleComponent } from './core/components/home/home-dashboard/home-dashboard-module/home-dashboard-module.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ButtonComponent } from './core/components/basics/button/button.component';
import { InputComponent } from './core/components/basics/input/input.component';
import { ResetPasswordComponent } from './core/components/reset-password/reset-password.component';
import { SelectRoleComponent } from './core/components/select-role/select-role.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    SideBarComponent,
    SideBarLinkComponent,
    HomeDashboardComponent,
    SideBarMenuComponent,
    HomeDashboardModuleComponent,
    ButtonComponent,
    InputComponent,
    ResetPasswordComponent,
    SelectRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [LoginService, TranslateService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
