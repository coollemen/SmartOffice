import {FsmState} from './fsm-state';
/**
 * 状态机动作
 */
export class FsmStateAction {
  public name: string;
  public owner: any;
  public state: FsmState;
  public enabled: boolean;
  public finished: boolean;
  public active: boolean;
  public onEnter() {

  }
  public onUpdate() {

  }
  public onExit() {

  }
}
