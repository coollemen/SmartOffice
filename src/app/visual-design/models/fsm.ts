import {FsmState} from './fsm-state';
import {FsmEvent} from './fsm-event';
import {FsmTransition} from './fsm-transition';
import {st} from '@angular/core/src/render3';
import {BmobObject} from '../../shared/decorators/bmob-object';
import {BmobData} from '../../shared/models/bmob-data';
import {BmobField} from '../../shared/decorators/bmob-field';

/**
 * 状态机
 */
@BmobObject('fsm')
export class FSM extends BmobData {
  @BmobField('name')
  public name: string;
  public owner: any;
  public active: boolean;
  public finished: boolean;
  public startState: string;
  public states: FsmState[];
  public events: FsmEvent[];
  public globalTransitions: FsmTransition[];
  public activeState: FsmState;
  public previousActiveState: FsmState;

  constructor() {
    super();
    this.states = [];
    this.events = [];
    this.globalTransitions = [];
  }

  public addState(state: FsmState) {
    const idx = this.states.findIndex(n => n.name === state.name);
    if (idx >= 0 && idx < this.states.length) {
      this.states[idx] = state;
    } else {
      this.states.push(state);
    }
  }

  public removeState(state: FsmState) {
    const idx = this.states.findIndex(n => n.name === state.name);
    if (idx >= 0 && idx < this.states.length) {
      this.states.splice(idx, 1);
    }
  }

  public getState(stateName: string): FsmState {
    return this.states.find(n => n.name === stateName);
  }

  public setState(state: FsmState) {
    const idx = this.states.findIndex(n => n.name === state.name);
    if (idx >= 0 && idx < this.states.length) {
      this.states[idx] = state;
    }
  }

  public hasState(stateName: string): boolean {
    const idx = this.states.findIndex(n => n.name === stateName);
    if (idx >= 0 && idx < this.states.length) {
      return true;
    } else {
      return false;
    }
  }

  public selectState(s: FsmState) {
    if (this.activeState === undefined) {
      this.previousActiveState = this.activeState;
      this.activeState = s;
    } else {
      if (this.activeState.name !== s.name) {
        this.previousActiveState = this.activeState;
        this.activeState = s;
      }
    }

  }

  /***
   * 移动到指定状态
   * @param {string} stateName 状态名
   */
  public moveToState(stateName: string) {
    // 当前状态推出
    this.activeState.onExit();
    const s = this.states.find(n => n.name === stateName);
    if (s != null) {
      this.previousActiveState = this.activeState;
      this.activeState = s;
      this.activeState.onEnter();
      this.activeState.onUpdate();
    } else {
      console.error('未找到指定状态，状态机运行错误！');
    }
  }

}
