import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DutyRosterConfig} from './models/duty-roster-config';
import {DutyRosterComponent} from './components/duty-roster/duty-roster.component';
import {DutyConfigComponent} from './components/duty-config/duty-config.component';

const dutyRosterRoutes: Routes = [
  {path: 'dutyconfig', component: DutyConfigComponent},
  {path: 'dutyroster', component: DutyRosterComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(dutyRosterRoutes)
  ],
  exports: [RouterModule]
})
export class DutyRosterRoutingModule {
}
