import {FsmTransition} from './fsm-transition';
import {FsmStateAction} from './fsm-state-action';
import {FsmEvent} from './fsm-event';

/**
 * 状态机状态
 */
export class FsmState {
  public name: string;
  public transitions: FsmTransition[];
  public actions: FsmStateAction[];
  public x: number;
  public y: number;
  public colorIndex: number;

  constructor(setName: string) {
    this.name = setName;
    this.transitions = [];
    this.actions = [];
    this.colorIndex = 0;
  }

  public addTransition(e: FsmEvent) {
    const transition = new FsmTransition();
    transition.event = e;
    this.transitions.push(transition);
  }

  public removeTransition(index: number) {
    if (index >= 0 && index < this.transitions.length) {
      this.transitions.splice(index, 1);
    }
  }

  public onEnter() {
    for (let i = 0; i < this.actions.length; i++) {
      this.actions[i].onEnter();
    }
  }

  public onUpdate() {
    for (let i = 0; i < this.actions.length; i++) {
      this.actions[i].onUpdate();
    }
  }

  public onExit() {
    for (let i = 0; i < this.actions.length; i++) {
      this.actions[i].onExit();
    }
  }
}
