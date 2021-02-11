import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ButtonComponent } from './components/basics/button/button.component';
import { InputComponent } from './components/basics/input/input.component';
import { InputSelectComponent } from './components/basics/input-select/input-select.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeDashboardComponent } from './components/home/home-dashboard/home-dashboard.component';
import { MenuComponent } from './components/side-bar/menu/menu.component';
import { HomeDashboardModuleComponent } from './components/home/home-dashboard/home-dashboard-module/home-dashboard-module.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { BoxDataComponent } from './components/box-data/box-data.component';
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
import { FromDividerComponent } from './components/basics/from-divider/from-divider.component';
import { FromTitleComponent } from './components/basics/from-title/from-title.component';
import { NgbdSortableHeader } from './directives/sortable.directive';
import { FormsComponent } from './components/forms/forms.component';
import { ColumnChartComponent } from './components/charts/column-chart/column-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { DatesBarComponent } from './components/charts/dates-bar/dates-bar.component';
import { ExportButtonsComponent } from './components/export-buttons/export-buttons.component';
import { FormListComponent } from './components/basics/form-list/form-list.component';
import { GenderFormatter } from './pipes/gender.pipe';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ResultsPerPageComponent } from './components/results-per-page/results-per-page.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { IconsModule } from '../icons/icons.module';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { PatientHeaderComponent } from './components/patient-header/patient-header.component';
import { FormHistoricComponent } from './components/basics/form-historic/form-historic.component';
import { FromSectionComponent } from './components/basics/from-section/from-section.component';
import { PasiSelectComponent } from './components/pasi-select/pasi-select.component';
import { PasiCheckboxComponent } from './components/pasi-checkbox/pasi-checkbox.component';
import { FormSearchComponent } from './components/basics/form-search/form-search.component';
import { ManyChartModalComponent } from './components/modals/many-chart-modal/many-chart-modal.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ChangePasswordModalComponent } from './components/modals/change-password-modal/change-password-modal.component';
import { QuestionnaireAnalysisArtritisPsoriasicaComponent } from './components/questionnaire-analysis-artritis-psoriasica/questionnaire-analysis-artritis-psoriasica.component';
import { NumericInput } from './directives/numeric-input.directive';
import { ButtonNailsComponent } from './components/button-nails/button-nails.component';
import { InputTextareaComponent } from './components/basics/app-input-textarea/app-input-textarea.component';
import { InputTypeaheadComponent } from './components/basics/input-typeahead/input-typeahead.component';
import { ContactComponent } from './components/contact/contact.component';
import { DynamicModalComponent } from './components/modals/dynamic-modal/dynamic-modal.component';
import { EntryMenuSelectComponent } from './components/basics/entry-menu-select/entry-menu-select.component';
import { Ng5SliderModule } from 'ng5-slider';
import { GroupedLinesChartComponent } from './components/charts/grouped-lines-chart/grouped-lines-chart.component';
import { InputMultiSelectComponent } from './components/basics/input-multi-select/input-multi-select.component';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { FormMultiSelectComponent } from './components/basics/form-multi-select/form-multi-select.component';
import { FormSpaceComponent } from './components/basics/form-space/form-space.component';
import { FormInputFileComponent } from './components/basics/form-input-file/form-input-file.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormAccordionComponent } from './components/basics/form-accordion/form-accordion.component';
import { FormTextComponent } from './components/basics/form-text/form-text.component';
import { DynamicFormComponent } from './components/dynamic/dynamic-form/dynamic-form.component';
import { TemplateFormComponent } from './components/dynamic/template-form-component/template-form.component';

export function createTranslateLoader (http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        LoginComponent,
        DashboardComponent,
        HomeComponent,
        HeaderComponent,
        SideBarComponent,
        HomeDashboardComponent,
        MenuComponent,
        HomeDashboardModuleComponent,
        ButtonComponent,
        InputComponent,
        InputSelectComponent,
        InputMultiSelectComponent,
        ResetPasswordComponent,
        SelectRoleComponent,
        SearchComponent,
        TableComponent,
        ButtonNailsComponent,
        BoxDataComponent,
        DynamicFormComponent,
        TemplateFormComponent,
        FormInputComponent,
        FormSelectComponent,
        FormMultiSelectComponent,
        FormInputFileComponent,
        FormButtonComponent,
        FormSpaceComponent,
        FormAccordionComponent,
        DynamicFieldDirective,
        NumericInput,
        FormCheckboxComponent,
        FormRadioComponent,
        EditorModalComponent,
        DynamicModalComponent,
        ConfirmModalComponent,
        GenericModalHeaderComponent,
        EditorModalFooterComponent,
        EditorModalBodyComponent,
        FormSwitchComponent,
        FormDatepickerComponent,
        SwitchComponent,
        PaginationComponent,
        FormTextareaComponent,
        InputFileComponent,
        FromDividerComponent,
        FromTitleComponent,
        FromSectionComponent,
        FormTextComponent,
        NgbdSortableHeader,
        FormsComponent,
        ColumnChartComponent,
        PieChartComponent,
        GroupedLinesChartComponent,
        DatesBarComponent,
        ExportButtonsComponent,
        FormListComponent,
        PatientHeaderComponent,
        GenderFormatter,
        BreadcrumbComponent,
        ResultsPerPageComponent,
        LineChartComponent,
        FormHistoricComponent,
        PasiSelectComponent,
        PasiCheckboxComponent,
        FormSearchComponent,
        ManyChartModalComponent,
        MyAccountComponent,
        ChangePasswordModalComponent,
        QuestionnaireAnalysisArtritisPsoriasicaComponent,
        InputTextareaComponent,
        InputTypeaheadComponent,
        ContactComponent,
        EntryMenuSelectComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        NgxBootstrapMultiselectModule,
        IconsModule,
        NgxChartsModule,
        Ng5SliderModule,
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
        HomeDashboardComponent,
        MenuComponent,
        HomeDashboardModuleComponent,
        ButtonComponent,
        InputComponent,
        InputSelectComponent,
        InputMultiSelectComponent,
        PasiSelectComponent,
        PasiCheckboxComponent,
        ButtonNailsComponent,
        ResetPasswordComponent,
        SelectRoleComponent,
        GenericModalHeaderComponent,
        SearchComponent,
        TableComponent,
        BoxDataComponent,
        DynamicFormComponent,
        TemplateFormComponent,
        DynamicFieldDirective,
        NumericInput,
        EditorModalComponent,
        DynamicModalComponent,
        ConfirmModalComponent,
        FormSwitchComponent,
        FormsComponent,
        SwitchComponent,
        PieChartComponent,
        GroupedLinesChartComponent,
        ExportButtonsComponent,
        ColumnChartComponent,
        DatesBarComponent,
        PaginationComponent,
        HomeDashboardModuleComponent,
        GenderFormatter,
        PatientHeaderComponent,
        BreadcrumbComponent,
        ResultsPerPageComponent,
        LineChartComponent,
        InputTextareaComponent,
        InputTypeaheadComponent,
        EntryMenuSelectComponent,
        InputFileComponent,
        FormInputFileComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [GenderFormatter],
    entryComponents: [FormButtonComponent, FormInputComponent, FormSelectComponent, FormMultiSelectComponent],
})
export class CoreModule { }
