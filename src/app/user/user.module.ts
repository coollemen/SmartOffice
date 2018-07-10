import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from './services/user.service';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {UserInfoManageComponent} from './components/user-info-manage/user-info-manage.component';
import {UserRoutingModule} from './user-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RoleManageComponent } from './components/role-manage/role-manage.component';
import {MaterialModule} from '../material/material.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    UserRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [RegisterComponent, LoginComponent, ResetPasswordComponent, UserInfoManageComponent, RoleManageComponent],
  providers: [UserService],
})
export class UserModule { }
