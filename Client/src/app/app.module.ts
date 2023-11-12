import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Route, Router, RouterModule} from '@angular/router';

import { AppComponent } from './components/app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { InvoiceListComponent } from './components/invoice.list/invoice.list.component';
import { InvoiceViewComponent } from './components/invoice.view/invoice.view.component';
import { InvoiceCreateComponent } from './components/invoice.create/invoice.create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpServiceService} from "./service/http-service.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./service/auth.interceptor";
import {UserServiceService} from "./service/user-service.service";
import {RoleGuard} from "./service/role.guard";
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";

const routes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent, canActivate: [RoleGuard], data: {roles: ['ADMIN', 'USER', 'ACCOUNTANT']}},
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: {roles: ['ADMIN']}},
  { path: 'invoice_list', component: InvoiceListComponent, canActivate: [RoleGuard], data: {roles: ['ADMIN', 'USER', 'ACCOUNTANT']}},
  { path: 'invoice/:invoiceId', component: InvoiceViewComponent, canActivate: [RoleGuard], data: {roles: ['ADMIN', 'USER', 'ACCOUNTANT']}},
  { path: 'invoice_create', component: InvoiceCreateComponent, canActivate: [RoleGuard], data: {roles: ['ADMIN', 'ACCOUNTANT']}}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    InvoiceListComponent,
    InvoiceViewComponent,
    InvoiceCreateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ld56wwpAAAAAHJB74Xtcfs_zJi_0zOPFnC9id0h',
      } as RecaptchaSettings,
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    HttpServiceService,
    UserServiceService,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
