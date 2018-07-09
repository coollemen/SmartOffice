import { NgModule } from '@angular/core';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {DashboardComponent} from './core/dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {FiniteStateMachineComponent} from './visual-design/finite-state-machine/finite-state-machine.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: DashboardComponent},
  {path: 'home', component: HomeComponent},
  {path: 'fsm', component: FiniteStateMachineComponent},
  {path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
