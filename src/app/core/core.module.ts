import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ButtonComponent } from './components/basics/button/button.component';
import { InputComponent } from './components/basics/input/input.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SideBarLinkComponent } from './components/side-bar/side-bar-link/side-bar-link.component';
import { HomeDashboardComponent } from './components/home/home-dashboard/home-dashboard.component';
import { SideBarMenuComponent } from './components/side-bar/side-bar-menu/side-bar-menu.component';
import { HomeDashboardModuleComponent } from './components/home/home-dashboard/home-dashboard-module/home-dashboard-module.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import { BoxDataComponent } from './components/box-data/box-data.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
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
    SelectRoleComponent,
    SearchComponent,
    TableComponent,
    ModalComponent,
    BoxDataComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
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
    SelectRoleComponent,
    SearchComponent,
    TableComponent,
    ModalComponent,
    BoxDataComponent,
  ],
  providers: [ModalComponent],
})
export class CoreModule {}
