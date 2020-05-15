import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ButtonComponent } from './components/basics/button/button.component';
import { InputComponent } from './components/basics/input/input.component';
import { InputSelectComponent } from './components/basics/input-select/input-select.component';
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
import { BoxDataComponent } from './components/box-data/box-data.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormInputComponent } from './components/basics/form-input/form-input.component';
import { FormSelectComponent } from './components/basics/form-select/form-select.component';
import { FormButtonComponent } from './components/basics/form-button/form-button.component';
import { DynamicFieldDirective } from './directives/dynamic-forms/dynamic-field.directive';
import { FormCheckboxComponent } from './components/basics/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from './components/basics/form-radio/form-radio.component';
import { EditorModalFooterComponent } from './components/modals/editor-modal/editor-modal-footer/editor-modal-footer.component';
import { EditorModalBodyComponent } from './components/modals/editor-modal/editor-modal-body/editor-modal-body/editor-modal-body.component';
import { EditorModalComponent } from './components/modals/editor-modal/editor-modal/editor-modal.component';
import { GenericModalHeaderComponent } from './components/modals/generic-modal-header/generic-modal-header.component';
import { FormSwitchComponent } from './components/basics/form-switch/form-switch.component';
import { FormDatepickerComponent } from './components/basics/form-datepicker/form-datepicker.component';
import { SwitchComponent } from './components/basics/app-switch/app-switch.component';
import { PaginationComponent } from './components/basics/pagination/pagination.component';
import { FormTextareaComponent } from './components/basics/form-textarea/form-textarea.component';
import { InputFileComponent } from './components/basics/input-file/input-file.component';
import { RouterModule } from '@angular/router';
import { FormsComponent } from './components/forms/forms.component';

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
    InputSelectComponent,
    ResetPasswordComponent,
    SelectRoleComponent,
    SearchComponent,
    TableComponent,
    BoxDataComponent,
    DynamicFormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    DynamicFieldDirective,
    FormCheckboxComponent,
    FormRadioComponent,
    EditorModalComponent,
    GenericModalHeaderComponent,
    EditorModalFooterComponent,
    EditorModalBodyComponent,
    FormSwitchComponent,
    FormDatepickerComponent,
    SwitchComponent,
    PaginationComponent,
    FormTextareaComponent,
    FormsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule,
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
    InputSelectComponent,
    ResetPasswordComponent,
    SelectRoleComponent,
    SearchComponent,
    TableComponent,
    BoxDataComponent,
    DynamicFormComponent,
    DynamicFieldDirective,
    EditorModalComponent,
    FormSwitchComponent,
    SwitchComponent,
    PaginationComponent,
    HomeDashboardModuleComponent,
  ],
  providers: [],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
  ],
})
export class CoreModule {}
