import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphBaseComponent} from './graph-base/graph-base.component';
import {FiniteStateMachineComponent} from './finite-state-machine/finite-state-machine.component';
import {AngularDraggableModule} from 'angular2-draggable';
import {GraphNodeComponent} from './graph-node/graph-node.component';
import {FsmManagerService} from './services/fsm-manager.service';
import { StateNodeComponent } from './state-node/state-node.component';
import { TransitionNodeComponent } from './transition-node/transition-node.component';
import {ContextMenuModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    AngularDraggableModule,
    ContextMenuModule
  ],
  declarations: [
    GraphBaseComponent,
    FiniteStateMachineComponent,
    GraphNodeComponent,
    StateNodeComponent,
    TransitionNodeComponent],
  providers: [FsmManagerService]
})
export class VisualDesignModule {
}
