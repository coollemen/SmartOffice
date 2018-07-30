import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DutyRosterComponent} from './components/duty-roster/duty-roster.component';
import {SharedModule} from '../shared/shared.module';
import { DutyConfigComponent } from './components/duty-config/duty-config.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {DutyRosterRoutingModule} from './duty-roster-routing.module';
import {UserService} from '../user/services/user.service';
import {DutyRosterService} from './services/duty-roster.service';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BrowserModule,
    NgZorroAntdModule,
    DutyRosterRoutingModule
  ],
  declarations: [DutyRosterComponent, DutyConfigComponent],
  providers: [DutyRosterService],
})
export class DutyRosterModule { }
