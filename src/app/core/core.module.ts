import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {LayoutModule} from '@angular/cdk/layout';
import { DynamicDirective } from './directives/dynamic.directive';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    MaterialModule,
    NgZorroAntdModule
  ],
  declarations: [
    PageNotFoundComponent,
    DashboardComponent,
    HomeComponent,
    DynamicDirective,
  ],
  providers: [],
})
export class CoreModule { }
