import { NgModule } from '@angular/core';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {RoleManageComponent} from './components/role-manage/role-manage.component';

const userRoutes:Routes=[
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"resetPassword",component:ResetPasswordComponent},
  {path:"roleManage",component:RoleManageComponent},
]
@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports:[RouterModule]
})
export class UserRoutingModule { }
